"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AISearchAPIError = void 0;
/**
 * Custom error class for API-related errors
 */
class AISearchAPIError extends Error {
    constructor(description, statusCode, response) {
        super(description);
        this.statusCode = statusCode;
        this.response = response;
        this.name = 'AISearchAPIError';
        this.error = {
            descripiton: description
        };
    }
}
exports.AISearchAPIError = AISearchAPIError;
//# sourceMappingURL=types.js.map