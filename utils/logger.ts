/**
 * Log levels representation.
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// Default log level depending on environment configuration
const CURRENT_LEVEL: LogLevel =
  (process.env.LOG_LEVEL as LogLevel) ||
  (process.env.NODE_ENV === 'production' ? 'info' : 'debug');

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[CURRENT_LEVEL];
}

/**
 * Shared logging helper to standardize console logs in development and production.
 */
export const logger = {
  debug(message: string, ...args: unknown[]) {
    if (shouldLog('debug')) {
      console.debug(`[DEBUG] [${new Date().toISOString()}] ${message}`, ...args);
    }
  },

  info(message: string, ...args: unknown[]) {
    if (shouldLog('info')) {
      console.info(`[INFO] [${new Date().toISOString()}] ${message}`, ...args);
    }
  },

  warn(message: string, ...args: unknown[]) {
    if (shouldLog('warn')) {
      console.warn(`[WARN] [${new Date().toISOString()}] ${message}`, ...args);
    }
  },

  error(message: string, error?: unknown, ...args: unknown[]) {
    if (shouldLog('error')) {
      console.error(
        `[ERROR] [${new Date().toISOString()}] ${message}`,
        error,
        ...args
      );
    }
  },
};
