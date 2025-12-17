/**
 * Logger utility for production-safe logging
 * Logs only in development mode to avoid cluttering production console
 */

const isDevelopment = import.meta.env.MODE === "development";

export const logger = {
  log: (...args) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },

  error: (...args) => {
    if (isDevelopment) {
      console.error(...args);
    }
    // In production, you can integrate with error tracking service like Sentry
    // Sentry.captureException(args[0]);
  },

  warn: (...args) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },

  info: (...args) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },

  debug: (...args) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },
};
