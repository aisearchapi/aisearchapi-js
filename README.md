# ⚡ AI Search API - TypeScript Client

[![npm version](https://badge.fury.io/js/aisearchapi-client.svg)](https://www.npmjs.com/package/aisearchapi-client)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E.svg?logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933.svg?logo=node.js&logoColor=white)](https://nodejs.org/)

A **comprehensive TypeScript client for the [AI Search API](https://aisearchapi.io?utm_source=github)** that provides intelligent semantic search with context awareness and flexible response formats.  

👉 Start by creating your free account:  
- [🆕 Sign Up](https://app.aisearchapi.io/join?utm_source=github)  
- [🔑 Log In](https://app.aisearchapi.io/login?utm_source=github)  
- [📊 Dashboard](https://app.aisearchapi.io/dashboard?utm_source=github) (get and manage API keys)  

---

## ✨ Features

- 🔍 **Semantic AI Search** – Natural language queries powered by embeddings  
- 💬 **Context Awareness** – Add chat-like conversation context  
- 📝 **Flexible Responses** – Markdown or plain text  
- ⚡ **TypeScript First** – Strong typing, IntelliSense, better DX  
- 📊 **Usage Tracking** – Check [API balance](https://app.aisearchapi.io/dashboard?utm_source=github) anytime  

---

## 📦 Installation

```bash
npm install aisearchapi-client
# or with yarn
yarn add aisearchapi-client
```

Or install from source:

```bash
git clone https://github.com/aisearchapi/aisearchapi-js.git
cd aisearchapi-js
npm install
```

---

## 🚀 Quick Start

```typescript
import { AISearchAPIClient } from 'aisearchapi-client';

const client = new AISearchAPIClient({
  apiKey: 'your-api-key-here' // get it from https://app.aisearchapi.io/dashboard?utm_source=github
});

const result = await client.search({
  prompt: 'What is machine learning and how does it work?',
  response_type: 'markdown'
});

console.log(result.answer);
console.log('Sources:', result.sources);
```

---

## 🔧 API Reference

### Client Configuration

```typescript
const client = new AISearchAPIClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.aisearchapi.io',
  timeout: 30000 // in ms
});
```

### Search

```typescript
const result = await client.search({
  prompt: 'Your query',
  context: [{ role: 'user', content: 'Previous message' }],
  response_type: 'markdown'
});
```

### Balance

```typescript
const balance = await client.balance();
console.log('Credits left:', balance.available_credits);
```

---

## 💡 Usage Examples

### Basic Search

```typescript
const result = await client.search({ prompt: 'Explain quantum computing simply' });
console.log(result.answer);
```

### Contextual Search

```typescript
const result = await client.search({
  prompt: 'What are the benefits?',
  context: [
    { role: 'user', content: 'I am researching renewable energy' },
    { role: 'user', content: 'Specifically solar and wind' }
  ]
});
```

### Check Balance

```typescript
const balance = await client.balance();
if (balance.available_credits < 10) {
  console.warn('Low balance!');
}
```

### Error Handling

```typescript
import { AISearchAPIError } from 'aisearchapi-client';

try {
  const result = await client.search({ prompt: 'Hello' });
} catch (error) {
  if (error instanceof AISearchAPIError) {
    console.error(`API Error [${error.statusCode}]:`, error.message);
  }
}
```

---

## 📘 TypeScript Support

This client is built in TypeScript:

```typescript
import type { SearchRequest, SearchResponse } from 'aisearchapi-client';

const params: SearchRequest = { prompt: 'What is TypeScript?', response_type: 'markdown' };
const response: SearchResponse = await client.search(params);
```

---

## 📝 Response Formats

- **Markdown (default):** rich text formatting, lists, code blocks  
- **Plain text:** simple string without formatting  

```typescript
await client.search({ prompt: 'Explain REST APIs', response_type: 'markdown' });
await client.search({ prompt: 'Explain Node.js', response_type: 'text' });
```

---

## ⚠️ Error Codes

| Code | Meaning | Fix |
|------|---------|-----|
| 401 | Unauthorized | Invalid API key → [Get key](https://app.aisearchapi.io/dashboard?utm_source=github) |
| 429 | Too Many Requests | Rate limit hit |
| 433 | Quota Exceeded | Credits finished |
| 500 | Server Error | Try again later |
| 503 | Service Down | Maintenance |

---

## 🔑 Environment Variables

```bash
# .env
AI_SEARCH_API_KEY=your-key-here
```

```typescript
const client = new AISearchAPIClient({
  apiKey: process.env.AI_SEARCH_API_KEY!
});
```

---

## 🌐 Browser Support

Primarily for Node.js. For browsers: configure CORS + secure your keys.

---

## 📚 Resources

- [AI Search API Homepage](https://aisearchapi.io?utm_source=github)  
- [Join](https://app.aisearchapi.io/join?utm_source=github) | [Login](https://app.aisearchapi.io/login?utm_source=github) | [Dashboard](https://app.aisearchapi.io/dashboard?utm_source=github)  
- [Docs](https://docs.aisearchapi.io?utm_source=github)  
- [npm package](https://www.npmjs.com/package/aisearchapi-client)  
- [Issues](https://github.com/aisearchapi/aisearchapi-js/issues)  
- [Blog Posts](https://aisearchapi.io/blog/)

---

## 📜 License

MIT License - see the [LICENSE](LICENSE).

---

### 🔍 SEO Keywords  
AI Search API TypeScript client, semantic search Node.js, contextual AI JavaScript, AI Search API npm package, AI Search API key setup, intelligent search SDK
