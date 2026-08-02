import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
    { ignores: ['build', 'node_modules'] },
    {
        files: ['**/*.{ts,tsx}'],
        extends: [tseslint.configs.recommended, reactPlugin.configs.flat.recommended],
        languageOptions: {
            ...reactPlugin.configs.flat.recommended.languageOptions,
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser
        },
        plugins: {
            'react-hooks': reactHooksPlugin
        },
        rules: {
            ...reactHooksPlugin.configs.recommended.rules,
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off'
        },
        settings: {
            react: { version: 'detect' }
        }
    },
    eslintConfigPrettier
);
