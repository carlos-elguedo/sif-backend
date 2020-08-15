const FormatError = require('easygraphql-format-error');

const formatError = new FormatError();

const buildStackTrace = err => {
console.log("*********err:->", err)
  if (err.extensions) {
    const {
      exception: { stacktrace: location }
    } = err.extensions;

    const stackTrace = {
      code: err.message,
      path: err.path,
      location
    };
    //console.log('----->', { ...formatError.getError(err) , ...stackTrace})

    return { ...formatError.getError(err), ...stackTrace };
  }

  return err;
};

module.exports = { buildStackTrace };
