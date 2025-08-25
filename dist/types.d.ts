/**
 * Supported response formats for API responses
 */
export type ResponseType = 'text' | 'markdown';
/**
 * Chat message role - currently only 'user' is supported
 */
export type ChatMessageRole = 'user';
/**
 * Individual chat message for providing conversation context
 */
export interface ChatMessage {
    /** The role of the message sender - currently only 'user' is supported */
    role: ChatMessageRole;
    /** The content of the message that helps provide context to the LLM */
    content: string;
}
/**
 * Parameters for the search API request
 */
export interface SearchRequest {
    /**
     * The main search query that drives the embedding process.
     * This content is parsed and transformed into vector representations
     * for similarity matching and retrieval.
     */
    prompt: string;
    /**
     * Optional conversation context to enhance the model's understanding.
     * An ordered list of previous messages that influence the final response.
     */
    context?: ChatMessage[];
    /**
     * Response format preference.
     * - 'markdown': Returns rich formatted text with styling (default)
     * - 'text': Returns plain text without formatting
     */
    response_type?: ResponseType;
}
/**
 * Successful response from the search API
 */
export interface SearchResponse {
    /** The main AI-generated response based on your prompt and context */
    answer: string;
    /** List of sources used to generate the response */
    sources: string[];
    /** The format of the response as specified in the request */
    response_type: ResponseType;
    /** Total processing time in milliseconds */
    total_time: number;
}
/**
 * Response from the balance API
 */
export interface BalanceResponse {
    /** Number of available API credits remaining in your account */
    available_credits: number;
}
/**
 * Configuration options for the API client
 */
export interface ClientConfig {
    /** Your API bearer token (without 'Bearer ' prefix) */
    apiKey: string;
    /**
     * Base URL for the API endpoints
     * @default 'https://api.aisearchapi.io'
     */
    baseUrl?: string;
    /**
     * Request timeout in milliseconds
     * @default 30000
     */
    timeout?: number;
}
/**
 * Custom error class for API-related errors
 */
export declare class AISearchAPIError extends Error {
    statusCode?: number | undefined;
    response?: any | undefined;
    error: {
        descripiton: string;
    };
    constructor(description: string, statusCode?: number | undefined, response?: any | undefined);
}
//# sourceMappingURL=types.d.ts.map