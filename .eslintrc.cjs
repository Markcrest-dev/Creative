module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
        'react/prop-types': 'off', // Using TypeScript for prop validation
        '@typescript-eslint/no-explicit-any': 'warn', // Allow any but warn
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'prettier/prettier': 'warn',
        'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    ignorePatterns: ['dist', 'node_modules', 'coverage', '*.config.js', '*.config.ts'],
};
