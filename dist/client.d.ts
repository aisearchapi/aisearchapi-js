import { ClientConfig, SearchRequest, SearchResponse, BalanceResponse } from './types';
/**
 * AI Search API Client for TypeScript/Node.js
 *
 * Provides easy-to-use methods for interacting with the AI Search API,
 * including intelligent search with context awareness and account balance checking.
 *
 * @example
 * ```typescript
 * const client = new AISearchAPIClient({
 *   apiKey: 'your-api-key-here'
 * });
 *
 * // Perform a search
 * const result = await client.search({
 *   prompt: 'What is machine learning?',
 *   response_type: 'markdown'
 * });
 *
 * // Check account balance
 * const balance = await client.balance();
 * ```
 */
export declare class AISearchAPIClient {
    private readonly apiKey;
    private readonly baseUrl;
    private readonly timeout;
    /**
     * Initialize the AI Search API client
     *
     * @param config Configuration options including API key and optional settings
     */
    constructor(config: ClientConfig);
    /**
     * Perform an AI-powered search with optional conversation context
     *
     * This method sends your search query to the API, which processes it using
     * advanced embedding techniques and returns an intelligent response with sources.
     *
     * @param request Search parameters including prompt, context, and response format
     * @returns Promise resolving to the search results
     *
     * @example
     * ```typescript
     * const result = await client.search({
     *   prompt: 'Explain quantum computing',
     *   context: [
     *     { role: 'user', content: 'I am a computer science student' }
     *   ],
     *   response_type: 'markdown'
     * });
     *
     * console.log(result.answer);
     * console.log('Sources:', result.sources);
     * console.log('Processing time:', result.total_time, 'ms');
     * ```
     */
    search(request: SearchRequest): Promise<SearchResponse>;
    /**
     * Check your current account balance and available API credits
     *
     * @returns Promise resolving to balance information
     *
     * @example
     * ```typescript
     * const balance = await client.balance();
     * console.log('Available credits:', balance.available_credits);
     *
     * if (balance.available_credits < 10) {
     *   console.log('Warning: Low credit balance!');
     * }
     * ```
     */
    balance(): Promise<BalanceResponse>;
    /**
     * Make an HTTP request with timeout handling
     */
    private makeRequest;
    /**
     * Handle and parse API error responses
     */
    private handleErrorResponse;
    /**
     * Validate search request parameters
     */
    private validateSearchRequest;
}
//# sourceMappingURL=client.d.ts.map