// ApiResponse<T> – generic wrapper
// Why generics here?
// We use ApiResponse<T> to guarantee consistent API response shapes, while still preserving strong types for different endpoints.

// apps/backend/src/common/api-response.ts
export class ApiResponse<T> {
  constructor(
    public readonly success: boolean,
    public readonly data?: T,
    public readonly error?: string,
  ) {}

  static ok<T>(data: T): ApiResponse<T> {
    return new ApiResponse<T>(true, data);
  }

  static fail<T = unknown>(message: string): ApiResponse<T> {
    return new ApiResponse<T>(false, undefined, message);
  }
}
