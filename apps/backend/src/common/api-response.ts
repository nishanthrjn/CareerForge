// ApiResponse<T> – generic wrapper
// Why generics here?
// We use ApiResponse<T> to guarantee consistent API response shapes, while still preserving strong types for different endpoints.

// apps/backend/src/common/api-response.ts
export class ApiResponse<T> {
  constructor(
    public readonly success: boolean,
    public readonly data?: T,
    public readonly error?: string,
  ) { }

  static ok<T>(data: T): ApiResponse<T> {
    return new ApiResponse<T>(true, data);
  }

  static fail<T = unknown>(message: string): ApiResponse<T> {
    return new ApiResponse<T>(false, undefined, message);
  }
}

export class PaginatedResponse<T> extends ApiResponse<T[]> {
  constructor(
    public readonly success: boolean,
    public readonly data: T[],
    public readonly metaData: { total: number; page: number; limit: number; totalPages: number },
    public readonly error?: string,
  ) {
    super(success, data, error);
  }

  static paginated<T>(data: T[], metaData: { total: number; page: number; limit: number; totalPages: number }): PaginatedResponse<T> {
    return new PaginatedResponse<T>(true, data, metaData);
  }
}
