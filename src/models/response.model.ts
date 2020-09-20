export interface ResponseError {
  message: string;
}

export interface ResponseStatus {
  status: number;
}

export interface ResponseData {
  response: ResponseStatus;
  errors?: ResponseError[];
}
