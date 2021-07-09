export class InvalidArgumentException extends Error {
    constructor(...params) {
        super(...params);
        this.name = 'InvalidArgumentException';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidArgumentException);
        }
    }
}
export class FileNotFoundError extends Error {
    constructor(...params) {
        super(...params);
        this.name = 'FileNotFoundError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidArgumentException);
        }
    }
};