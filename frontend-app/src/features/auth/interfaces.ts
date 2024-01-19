export interface User {
  email: string;
}

export interface AuthState {
  user: User | null;
  error: string | null;
  loading: boolean;
}

export interface Credentials {
  email: string;
  password: string;
}