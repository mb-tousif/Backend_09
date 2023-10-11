export interface ILoginResponse {
  token: string;
  refreshToken: string;
}

export type IRefreshTokenResponse = {
  accessToken: string;
};

export enum Enum_Role {
  ADMIN = 'Admin',
  USER = 'User',
  SUPER_ADMIN = 'Super_admin',
}
