/**
 * Base Application Error class.
 * All custom domain errors inherit from this class.
 */
export class AppError extends Error {
  public readonly code: string;
  public readonly status: number;
  public readonly isOperational: boolean;

  constructor(message: string, code = 'INTERNAL_ERROR', status = 500, isOperational = true) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.status = status;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Authentication and authorization errors.
 */
export class AuthError extends AppError {
  constructor(message = 'Unauthorized access', code = 'UNAUTHORIZED', status = 401) {
    super(message, code, status);
  }
}

/**
 * Database operation failures.
 */
export class DatabaseError extends AppError {
  constructor(message = 'Database operation failed', code = 'DATABASE_ERROR', status = 500) {
    super(message, code, status);
  }
}

/**
 * Input validation failures.
 */
export class ValidationError extends AppError {
  public readonly errors?: Record<string, string[]>;

  constructor(message = 'Validation failed', errors?: Record<string, string[]>) {
    super(message, 'VALIDATION_ERROR', 400);
    this.errors = errors;
  }
}

/**
 * Gemini AI generation failures.
 */
export class AIError extends AppError {
  constructor(message = 'AI Generation failed', code = 'AI_GENERATION_ERROR', status = 502) {
    super(message, code, status);
  }
}

/**
 * Helper to determine if an error is a safe, operational application error.
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}
