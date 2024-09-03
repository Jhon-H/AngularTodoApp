export interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  email: string | null;
  name: string | null;
}

export interface RegisterUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
}

export interface LoginUser {
  email: string;
  password: string;
}
