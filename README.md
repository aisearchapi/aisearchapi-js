# AI Search API - TypeScript Client

A comprehensive TypeScript client library for the AI Search API that provides intelligent search capabilities with context awareness and semantic understanding.

[![npm version](https://badge.fury.io/js/aisearchapi-client.svg)](https://www.npmjs.com/package/aisearchapi-client)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E.svg?logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933.svg?logo=node.js&logoColor=white)](https://nodejs.org/)

## Features

✨ **Intelligent Search** - Leverage advanced AI embeddings for semantic search  
🔗 **Context Awareness** - Include conversation context to enhance responses  
📝 **Multiple Formats** - Get responses in plain text or rich Markdown  
⚡ **TypeScript First** - Full type safety and excellent IntelliSense support  
📊 **Balance Tracking** - Monitor your API usage and remaining credits

## Installation

```bash
npm install aisearchapi-client
```
*or if you use yarn:*
```bash
yarn add aisearchapi-client
```

*Or install from source:*

```bash
git clone https://github.com/aisearchapi/aisearchapi-js.git
cd aisearchapi-js
npm install
```

## Quick Start

```typescript
import { AISearchAPIClient } from 'aisearchapi-client';

// Initialize the client
const client = new AISearchAPIClient({
  apiKey: 'your-api-key-here'
});

// Perform a search
const result = await client.search({
  prompt: 'What is machine learning and how does it work?',
  response_type: 'markdown'
});

console.log(result.answer);
console.log('Sources:', result.sources);
```

## API Reference

### Client Configuration

```typescript
const client = new AISearchAPIClient({
  apiKey: 'your-api-key',        // Required: Your API bearer token
  baseUrl: 'https://api.aisearchapi.io', // Optional: Custom API base URL
  timeout: 30000                 // Optional: Request timeout in ms (default: 30000)
});
```

### Search Method

Perform an AI-powered search with optional conversation context.

```typescript
const result = await client.search({
  prompt: 'Your search query',
  context: [                           // Optional conversation context
    { role: 'user', content: 'Previous message context' }
  ],
  response_type: 'markdown'            // Optional: 'text' or 'markdown' (default)
});
```

**Parameters:**

- `prompt` (string, required): The main search query for embedding and retrieval
- `context` (array, optional): Previous conversation messages for enhanced context
- `response_type` ('text' | 'markdown', optional): Response format preference

**Returns:**

```typescript
{
  answer: string;           // AI-generated response
  sources: string[];        // List of sources used
  response_type: string;    // Actual response format used
  total_time: number;       // Processing time in milliseconds
}
```

### Balance Method

Check your current account balance and available API credits.

```typescript
const balance = await client.balance();
console.log('Available credits:', balance.available_credits);
```

**Returns:**

```typescript
{
  available_credits: number;  // Number of API credits remaining
}
```

## Usage Examples

### Basic Search

```typescript
import { AISearchAPIClient } from 'aisearchapi-client';

const client = new AISearchAPIClient({
  apiKey: process.env.AI_SEARCH_API_KEY!
});

async function performSearch() {
  try {
    const result = await client.search({
      prompt: 'Explain quantum computing in simple terms'
    });
    
    console.log('Answer:', result.answer);
    console.log('Sources:', result.sources);
    console.log(`Processed in ${result.total_time}ms`);
  } catch (error) {
    console.error('Search failed:', error);
  }
}
```

### Search with Context

```typescript
async function contextualSearch() {
  const result = await client.search({
    prompt: 'What are the main benefits?',
    context: [
      { role: 'user', content: 'I am interested in renewable energy solutions' },
      { role: 'user', content: 'Specifically solar and wind power' }
    ],
    response_type: 'markdown'
  });
  
  console.log(result.answer); // Response will be contextually aware
}
```

### Monitor Account Balance

```typescript
async function checkUsage() {
  try {
    const balance = await client.balance();
    
    console.log(`Credits remaining: ${balance.available_credits}`);
    
    if (balance.available_credits < 10) {
      console.warn('Warning: Low credit balance!');
    }
  } catch (error) {
    console.error('Failed to check balance:', error);
  }
}
```

### Error Handling

```typescript
import { AISearchAPIError } from 'aisearchapi-client';

async function handleErrors() {
  try {
    const result = await client.search({
      prompt: 'Your search query'
    });
  } catch (error) {
    if (error instanceof AISearchAPIError) {
      console.error(`API Error [${error.statusCode}]:`, error.message);
      console.error('Response data:', error.response);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}
```

## TypeScript Support

This library is written in TypeScript and provides full type safety:

```typescript
import type { SearchRequest, SearchResponse, ChatMessage } from 'aisearchapi-client';

const searchParams: SearchRequest = {
  prompt: 'What is TypeScript?',
  context: [
    { role: 'user', content: 'I am learning web development' }
  ],
  response_type: 'markdown'
};

const response: SearchResponse = await client.search(searchParams);
```

## Response Formats

### Markdown (Default)
Rich formatted responses with styling, perfect for rendering in applications that support Markdown:

```typescript
const result = await client.search({
  prompt: 'Explain REST APIs',
  response_type: 'markdown'
});
// Returns formatted text with **bold**, *italics*, lists, code blocks, etc.
```

### Plain Text
Clean, unformatted responses ideal for logging or custom styling:

```typescript
const result = await client.search({
  prompt: 'What is Node.js?',
  response_type: 'text'
});
// Returns plain text without any formatting
```

## Error Codes

| Status Code | Error Type | Description |
|------------|------------|-------------|
| 401 | Unauthorized | Invalid API key |
| 429 | Too Many Requests | Rate limit exceeded |
| 433 | Quota Exceeded | Account message quota reached |
| 500 | Server Error | Internal server error |
| 503 | Service Unavailable | API temporarily down |

## Environment Variables

For security, store your API key in environment variables:

```bash
# .env file
AI_SEARCH_API_KEY=as-dev-your-api-key-here
```

```typescript
const client = new AISearchAPIClient({
  apiKey: process.env.AI_SEARCH_API_KEY!
});
```

## Browser Support

This library is designed for Node.js environments. For browser usage, ensure you have proper CORS configuration and consider the security implications of exposing API keys.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: admin@aisearchapi.io
- 📚 Documentation: https://docs.aisearchapi.io
- 🐛 Issues: https://github.com/aisearchapi/aisearchapi-js/issues

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
