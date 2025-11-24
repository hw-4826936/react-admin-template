module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: [`${__dirname}/tsconfig.app.json`, `${__dirname}/tsconfig.node.json`],
    tsconfigRootDir: __dirname,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    // React 17+ doesn't require React in scope
    'react/react-in-jsx-scope': 'off',

    // Allow props spreading
    'react/jsx-props-no-spreading': 'off',

    // Prefer named exports
    'import/prefer-default-export': 'off',

    // Strictly forbid 'any'
    '@typescript-eslint/no-explicit-any': 'error',

    // Allow console in development
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // Prettier integration
    'prettier/prettier': 'error',

    // Allow devDependencies in config files
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.ts',
          '**/*.test.tsx',
          '**/*.spec.ts',
          '**/*.spec.tsx',
          '**/vite.config.ts',
          '**/tailwind.config.js',
          '**/postcss.config.js',
        ],
      },
    ],

    // React function component definition
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
