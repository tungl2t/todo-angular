import { IResponse } from '@interfaces';

export interface ILoginResponseData {
  readonly code: number;
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface ILoginResponse extends IResponse<ILoginResponseData> {}
