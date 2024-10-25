export class ResponseError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.message = message;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}
export class UnAuthorized extends ResponseError {
  constructor(message = "Unauthorized", status = 401) {
    super(message, status);
  }
}

export class BadRequest extends ResponseError {
  constructor(message: string, status = 400) {
    super(message, status);
  }
}

export class NotFound extends ResponseError {
  constructor(message = "Not Found", status = 404) {
    super(message, status);
  }
}

export class ForBidden extends ResponseError {
  constructor(message = "ForBidden", status = 403) {
    super(message, status);
  }
}
export class PaymentRequired extends ResponseError {
  constructor(message: string, status = 402) {
    super(message, status);
  }
}
