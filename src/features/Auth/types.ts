export interface LoginValues {
  username: string;
  password?: string;
  remember?: boolean;
}

export interface User {
  id: string;
  username: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
  permissions: string[];
}
