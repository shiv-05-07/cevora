export type UserRole = 'student' | 'teacher' | 'professor';

export interface CevoraUser {
  profile: {
    name: string;
    username: string;
    email: string;
    role: UserRole;
  };
  community: {
    joined: boolean;
    key?: string;       // student community key
    name?: string;      // teacher/professor community name
  };
  auth: {
    loggedIn: boolean;
    createdAt: string;
  };
}
