import { createClient } from './server';
import { createClient as createSupabaseJsClient } from '@supabase/supabase-js';

/**
 * Gets a Supabase client capable of performing storage operations.
 * Prefers the service role client if configured, otherwise falls back to the user-scoped server client.
 */
export async function getStorageClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (serviceRoleKey) {
    return createSupabaseJsClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  // Fallback to user session server client
  return await createClient();
}

/**
 * Uploads a resume file to private Supabase Storage bucket 'resumes'.
 * Path format: resumes/{userId}/{resumeId}/{fileName}
 */
export async function uploadResumeFile(params: {
  userId: string;
  resumeId: string;
  fileName: string;
  fileBuffer: Buffer;
  contentType: string;
}): Promise<{ path: string; error?: string }> {
  try {
    const supabase = await getStorageClient();
    const safeFileName = params.fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storagePath = `${params.userId}/${params.resumeId}/${Date.now()}_${safeFileName}`;

    const { error } = await supabase.storage
      .from('resumes')
      .upload(storagePath, params.fileBuffer, {
        contentType: params.contentType,
        upsert: true,
      });

    if (error) {
      console.error('[Supabase Storage Upload Error]', error.message);
      return { path: '', error: error.message };
    }

    return { path: storagePath };
  } catch (err: any) {
    console.error('[Supabase Storage Unexpected Error]', err?.message || err);
    return { path: '', error: err?.message || 'Storage upload failed' };
  }
}

/**
 * Downloads a resume file from private storage.
 */
export async function downloadResumeFile(filePath: string): Promise<{ data: Blob | null; error?: string }> {
  try {
    const supabase = await getStorageClient();
    const { data, error } = await supabase.storage.from('resumes').download(filePath);
    if (error) {
      return { data: null, error: error.message };
    }
    return { data };
  } catch (err: any) {
    return { data: null, error: err?.message || 'Storage download failed' };
  }
}

/**
 * Deletes a resume file from private storage.
 */
export async function deleteResumeFile(filePath: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await getStorageClient();
    const { error } = await supabase.storage.from('resumes').remove([filePath]);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Storage delete failed' };
  }
}
