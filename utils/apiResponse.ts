import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types';

/**
 * Shared utility to build consistent Next.js NextResponse payloads.
 * Conforms to the standard ApiResponse type definition.
 */
export const apiResponse = {
  /**
   * Generates a successful response containing typed payload data.
   */
  success<T>(data: T, message?: string, status = 200) {
    const payload: ApiResponse<T> = {
      success: true,
      data,
      message,
    };
    return NextResponse.json(payload, { status });
  },

  /**
   * Generates an error response containing descriptive messages.
   */
  error(message: string, error?: string, status = 400) {
    const payload: ApiResponse = {
      success: false,
      message,
      error,
    };
    return NextResponse.json(payload, { status });
  },
};
