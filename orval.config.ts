// orval.config.ts

import { defineConfig } from 'orval';

export default defineConfig({
  multiTenantShop: {
    input: './openapi.yaml', // Adjust if needed
    output: {
      mode: 'tags-split',
      target: './src/api/generated.ts',
      schemas: './src/api/schemas',
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