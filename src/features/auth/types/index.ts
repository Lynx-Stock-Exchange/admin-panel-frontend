export type AdminUser = {
  id: string;
  username: string;
  is_active: boolean;
};

export type LoginCredentials = {
  username: string;
  password: string;
};

export type RegisterCredentials = {
  username: string;
  password: string;
};
