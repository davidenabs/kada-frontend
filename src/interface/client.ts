export interface IParams {
  [key: string]: any;
}
export interface IQueryParams {
  enabled?: boolean;
  params?: IParams;
}

export interface IResponse<T> {
  data: T;
  success: boolean;
  message: string;
}
