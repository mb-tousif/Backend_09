export interface ILoginResponse {
  token: string;
  refreshToken: string;
}

export type IRefreshTokenResponse = {
  accessToken: string;
};
