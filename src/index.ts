// src/index.ts

// Export the main client
export { AISearchAPIClient } from "./client.js";

// Export all types for users
export type {
    ClientConfig,
    SearchRequest,
    SearchResponse,
    BalanceResponse,
    ChatMessage,
    ChatMessageRole,
    ResponseType
} from "./types.js";

// Export the custom error class
export { AISearchAPIError } from "./types.js";
