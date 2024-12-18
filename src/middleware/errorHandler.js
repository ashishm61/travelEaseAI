export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      status: 'error',
      message: 'This email is already registered'
    });
  }

  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal server error'
  });
};