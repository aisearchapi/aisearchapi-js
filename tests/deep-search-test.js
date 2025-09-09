import {AISearchAPIClient} from "../dist/index.js";

const client = new AISearchAPIClient({
    apiKey: 'as-dev-d8ebed53acfd59a9d174d5dcf36ca0db',
    timeout: 500000,
})

const balance = await client.balance();
console.log(balance);

const res = await client.deepSearch({
    prompt: 'what are the best cookies in the world?',
})

console.log('deep search', res)

const simpleSearch = await client.search({
    prompt: 'what are the best cookies in the world?'
})

console.log('simple search', simpleSearch)