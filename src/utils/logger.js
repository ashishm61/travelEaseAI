const logLevels = {
  INFO: '✓',
  ERROR: '✗',
  WARN: '⚠'
};

export const logger = {
  info: (message) => console.log(`${logLevels.INFO} ${message}`),
  error: (message, error) => {
    console.error(`${logLevels.ERROR} ${message}`);
    if (error) {
      console.error(error);
    }
  },
  warn: (message) => console.warn(`${logLevels.WARN} ${message}`)
};