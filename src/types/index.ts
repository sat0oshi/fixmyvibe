
export type UserRole = 'no-code' | 'developer';

export interface User {
  id: string;
  email: string;
  username: string;
  name?: string;
  avatar_url?: string;
  role: UserRole;
  skills?: string[];
  bio?: string;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string;
  private_link: string | null;
  status: 'pending' | 'assigned' | 'completed';
  helper_id?: string | null;
  created_at: string;
  updated_at: string;
  tags?: string[] | null;
}

export interface Connection {
  id: string;
  project_id: string;
  helper_id: string;
  status: 'active' | 'completed';
  created_at: string;
  messages?: Message[];
}

export interface Message {
  id: string;
  connection_id: string;
  user_id: string;
  content: string;
  created_at: string;
  read?: boolean;
}
