import {AISearchAPIError} from "./types";
import {AISearchAPIClient} from "./client";

// Initialize client with your API key
const client = new AISearchAPIClient({
    apiKey: process.env.AI_SEARCH_API_KEY || 'as-dev-your-api-key-here'
});

async function main() {
    try {
        // Example 1: Basic search
        console.log('🔍 Performing basic search...');
        const basicResult = await client.search({
            prompt: 'What is machine learning and how does it work?',
            response_type: 'markdown'
        });

        console.log('Answer:', basicResult.answer);
        console.log('Sources:', basicResult.sources);
        console.log(`Processing time: ${basicResult.total_time}ms\n`);

        // Example 2: Search with context
        console.log('🎯 Performing contextual search...');
        const contextualResult = await client.search({
            prompt: 'What are the main advantages and disadvantages?',
            context: [
                { role: 'user', content: 'I am researching solar energy for my home' },
                { role: 'user', content: 'I live in a sunny climate with high electricity costs' }
            ],
            response_type: 'text'
        });

        console.log('Contextual Answer:', contextualResult.answer);
        console.log('Sources:', contextualResult.sources);
        console.log(`Processing time: ${contextualResult.total_time}ms\n`);

        // Example 3: Check account balance
        console.log('💰 Checking account balance...');
        const balance = await client.balance();
        console.log(`Available credits: ${balance.available_credits}`);

        if (balance.available_credits < 10) {
            console.warn('⚠️ Warning: Low credit balance!');
        }

    } catch (error) {
        if (error instanceof AISearchAPIError) {
            console.error(`❌ API Error [${error.statusCode}]:`, error.message);
            if (error.response) {
                console.error('Response data:', error.response);
            }
        } else {
            console.error('❌ Unexpected error:', error);
        }
    }
}

// Run the examples
main().catch(console.error);