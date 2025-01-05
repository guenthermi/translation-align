import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:prettier/recommended', // Adds Prettier integration
  ),
  {
    files: ['**/*.{js,ts,jsx,tsx}'], // Target JavaScript and TypeScript files
    rules: {
      // Custom ESLint rules
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn on unused vars but allow _ prefix
      semi: ['error', 'always'], // Require semicolons
      quotes: ['error', 'single', { avoidEscape: true }], // Use single quotes
      indent: ['error', 2], // Enforce 2-space indentation
      'max-len': ['warn', { code: 100 }], // Warn if lines exceed 100 characters
      'react/jsx-uses-react': 'off', // Disable for React 17+ with JSX runtime
      'react/react-in-jsx-scope': 'off', // Disable for React 17+ with JSX runtime
    },
  },
];

export default eslintConfig;
