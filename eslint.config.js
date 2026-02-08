import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import pretierConfig from 'eslint-config-prettier';

export default defineConfig([
    {
        files: ['**/*.js'],
        ignores: ['node_modules/**'],
        ...js.configs.recommended,
        languageOptions: {
            globals: globals.browser,
        },
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
        rules: {
            'no-console': 'warn',
            'no-undef': 'error',
            'require-await': 'error',
            'no-var': 'error',
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            'no-empty': ['warn', { allowEmptyCatch: true }],
        },
    },
    pretierConfig,
]);
