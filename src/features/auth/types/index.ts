export type AdminUser = {
  id: string;
  username: string;
  is_active: boolean;
};

export type LoginCredentials = {
  username: string;
  password: string;
};
