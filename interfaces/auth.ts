export interface register {
  email: string;
  phone: string;
  username: string;
  displayName: string;
  password: string;
}
export interface login {
    email?: string
    username?: string
    phone?: number | string
    password: string
}
