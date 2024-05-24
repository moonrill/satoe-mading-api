export class ApiResponseDto<T> {
  status: boolean;
  data?: T;
  message?: string;
  error?: object;
}
