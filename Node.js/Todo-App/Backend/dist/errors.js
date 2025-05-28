"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.ApiError = void 0;
class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ApiError';
    }
}
exports.ApiError = ApiError;
const handleError = (error) => {
    if (error instanceof ApiError) {
        return { statusCode: error.statusCode, message: error.message };
    }
    console.error('Unexpected error:', error);
    return { statusCode: 500, message: 'Internal server error' };
};
exports.handleError = handleError;
