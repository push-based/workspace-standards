import { TSESLint } from '@typescript-eslint/utils';

export default {
    plugins: ['nx'],
    rules: {
        "nx/no-empty-tags": "error",
        // "nx/no-invalid-type-tags": "error"
    },
} as TSESLint.Linter.Config;
