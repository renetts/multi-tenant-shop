import { defineConfig } from 'orval';

export default defineConfig({
  multiTenantShop: {
    input: './openapi.yaml', // Adjust if needed
    output: {
      mode: 'tags-split',
      target: './src/api',
      schemas: './src/model',
      client: 'react-query', // or 'axios' or 'fetch'
      override: {
        mutator: {
          path: './src/api/custom-fetch.ts', // Optional if you want to override the fetch client
          name: 'customFetch',
        },
      },
    },
  },
});