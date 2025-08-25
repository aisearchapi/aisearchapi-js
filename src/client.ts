import {
    ClientConfig,
    SearchRequest,
    SearchResponse,
    BalanceResponse,
    AISearchAPIError
} from './types';

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
export class AISearchAPIClient {
    private readonly apiKey: string;
    private readonly baseUrl: string;
    private readonly timeout: number;

    /**
     * Initialize the AI Search API client
     *
     * @param config Configuration options including API key and optional settings
     */
    constructor(config: ClientConfig) {
        if (!config.apiKey) {
            throw new Error('API key is required');
        }

        this.apiKey = config.apiKey;
        this.baseUrl = config.baseUrl || 'https://api.aisearchapi.io';
        this.timeout = config.timeout || 30000;
    }

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
    async search(request: SearchRequest): Promise<SearchResponse> {
        this.validateSearchRequest(request);

        const url = `${this.baseUrl}/v1/search`;
        const body = {
            prompt: request.prompt,
            ...(request.context && { context: request.context }),
            ...(request.response_type && { response_type: request.response_type })
        };

        try {
            const response = await this.makeRequest(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                await this.handleErrorResponse(response);
            }

            const data = await response.json() as SearchResponse;
            return data;
        } catch (error) {
            if (error instanceof AISearchAPIError) {
                throw error;
            }
            throw new AISearchAPIError(
                `Search request failed: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }

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
    async balance(): Promise<BalanceResponse> {
        const url = `${this.baseUrl}/v1/balance`;

        try {
            const response = await this.makeRequest(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });

            if (!response.ok) {
                await this.handleErrorResponse(response);
            }

            const data = await response.json() as BalanceResponse;
            return data;
        } catch (error) {
            if (error instanceof AISearchAPIError) {
                throw error;
            }
            throw new AISearchAPIError(
                `Balance request failed: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }

    /**
     * Make an HTTP request with timeout handling
     */
    private async makeRequest(url: string, options: any): Promise<any> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            if ((error as any).name === 'AbortError') {
                throw new AISearchAPIError(`Request timeout after ${this.timeout}ms`);
            }
            throw error;
        }
    }

    /**
     * Handle and parse API error responses
     */
    private async handleErrorResponse(response: any): Promise<never> {
        let errorMessage = `HTTP ${response.status}`;
        let errorData;

        try {
            errorData = await response.json();
            // Handle nested error format: { "error": { "descripiton": "message" } }
            if (errorData.error && errorData.error.descripiton) {
                errorMessage = errorData.error.descripiton;
            } else if (errorData.error && typeof errorData.error === 'string') {
                errorMessage = errorData.error;
            } else if (errorData.message) {
                errorMessage = errorData.message;
            }
        } catch {
            // Response body is not JSON or empty
        }

        // Provide helpful error messages for common status codes
        switch (response.status) {
            case 401:
                errorMessage = 'Unauthorized: Please check your API key';
                break;
            case 429:
                errorMessage = 'Too many requests: Please slow down your request rate';
                break;
            case 433:
                errorMessage = 'Account is at or over message quota: Please check your usage limits';
                break;
            case 500:
                errorMessage = 'Server error: Please try again later';
                break;
            case 503:
                errorMessage = 'Service unavailable: The API is temporarily down';
                break;
        }

        throw new AISearchAPIError(errorMessage, response.status, errorData);
    }

    /**
     * Validate search request parameters
     */
    private validateSearchRequest(request: SearchRequest): void {
        if (!request.prompt || typeof request.prompt !== 'string') {
            throw new Error('Prompt is required and must be a string');
        }

        if (request.context) {
            if (!Array.isArray(request.context)) {
                throw new Error('Context must be an array of chat messages');
            }

            for (const message of request.context) {
                if (!message.role || message.role !== 'user') {
                    throw new Error('Each context message must have role "user"');
                }
                if (!message.content || typeof message.content !== 'string') {
                    throw new Error('Each context message must have content as a string');
                }
            }
        }

        if (request.response_type && !['text', 'markdown'].includes(request.response_type)) {
            throw new Error('response_type must be either "text" or "markdown"');
        }
    }
}