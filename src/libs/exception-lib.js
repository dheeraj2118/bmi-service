class InvalidArgumentException extends Error {
    constructor(...params) {
        super(...params)
        this.name = 'InvalidArgumentException';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidArgumentException)
        }
    }
}
class FileNotFoundError extends Error {
    constructor(...params) {
        super(...params)
        this.name = 'FileNotFoundError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidArgumentException)
        }
    }
}

module.exports = {
    InvalidArgumentException: InvalidArgumentException,
    FileNotFoundError: FileNotFoundError
}