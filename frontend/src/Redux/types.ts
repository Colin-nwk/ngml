export type UserRole = 'admin' | 'staff' | 'customer' | 'supplier';

export interface UserState {
  role: UserRole;
}
