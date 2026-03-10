import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import noEmoji from 'eslint-plugin-no-emoji';

/** ESLint config that only runs the no-emoji rule. Used in build so build fails if any emoji is added. */
export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: { 'no-emoji': noEmoji },
    rules: {
      'no-emoji/no-emoji': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react-refresh/only-export-components': 'off',
    },
  }
);
