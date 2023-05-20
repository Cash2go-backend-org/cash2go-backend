class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
    this.errorType = "NotFoundError";
  }
}

class BadUserRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
    this.errorType = "BadUserRequestError";
  }
}
class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
    this.errorType = "UnAuthorizedError";
  }
}

module.exports = { NotFoundError, BadUserRequestError, UnAuthorizedError };
