class NoContentError extends Error {
  constructor(msg) {
    if (!msg) {
      msg = 'Provided request body was empty';
    }
    super(msg);
    this.name = 'NoContentError';
    this.status = 400;
  }
}

export default NoContentError;
