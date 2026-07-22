import { createClient } from "@/services/supabase/server";
import { userService } from "@/services/user";
import { AppError } from "@/lib/errors";

export async function requireAppUser() {
  const supabase = await createClient();
  const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

  if (authError || !authUser) {
    throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
  }

  // Derive defaults for synchronization
  // email format: username@domain.com
  const emailPrefix = authUser.email?.split('@')[0] || authUser.id.substring(0, 8);
  const fullName = authUser.user_metadata?.full_name || emailPrefix;
  const username = authUser.user_metadata?.user_name || emailPrefix;
  const avatarUrl = authUser.user_metadata?.avatar_url || null;
  const role = authUser.user_metadata?.role;

  try {
    // Idempotent sync function: fetches first, creates if missing.
    const appUser = await userService.syncUser({
      id: authUser.id,
      fullName,
      username,
      avatarUrl,
      role,
    });

    if (!appUser) {
      throw new AppError("User sync returned null", "SYNC_ERROR", 500);
    }

    return { authUser, appUser };
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError("Failed to synchronize user", "SYNC_ERROR", 500);
  }
}

