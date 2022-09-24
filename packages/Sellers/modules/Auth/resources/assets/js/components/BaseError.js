export default class BaseError extends Error {
  code = null;
  data = null;

  constructor(code, message, data) {
    super(message);
    this.code = code;
    this.data = data;
  }
}
