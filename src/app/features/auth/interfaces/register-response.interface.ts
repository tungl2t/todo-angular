import { IResponse } from '@interfaces';

export interface IRegisterResponseData {
  readonly id: number;
  readonly email: string;
  readonly updatedAt: Date;
  readonly createdAt: Date;
}

export interface IRegisterResponse extends IResponse<IRegisterResponseData> {}
