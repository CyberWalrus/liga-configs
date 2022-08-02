const path = require('path');

module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    plugins: [
        'react',
        'react-hooks',
        '@typescript-eslint',
        'filenames',
        'simple-import-sort',
        'import',
        'prettier',
    ],
    env: {
        es2021: true,
        browser: true,
        node: true,
        jest: true,
    },
    globals: {
        __CLIENT__: 'readonly',
        __SERVER__: 'readonly',
        __DEVELOPMENT__: 'readonly',
        __VERSION__: 'readonly',
        shallow: true,
        mount: true,
    },
    extends: [
        'eslint:recommended',
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'airbnb-typescript-prettier',
    ],
    rules: {
        'react/sort-comp': [
            1,
            {
                order: [
                    'static-variables',
                    'static-methods',
                    'instance-variables',
                    'lifecycle',
                    'everything-else',
                    'render',
                ],
            },
        ],
        'no-unused-vars': 'warn',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: false,
                varsIgnorePattern: '^React$|^_$',
            },
        ],
        'filenames/match-regex': [2, '^[a-z0-9-.]+$', , true],
        'jsx-a11y/anchor-is-valid': 'off', // TODO: rework button
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'react/state-in-constructor': 'off',
        'react/jsx-fragments': ['error', 'syntax'],
        'react/jsx-filename-extension': [
            // TODO: change extension for JSX files
            'error',
            {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        ],
        // Feb 2022 rules
        'react/function-component-definition': 'off', // Используем любые типы функций для определения React компонентов
        '@typescript-eslint/ban-ts-comment': 'off', // TODO: убрать после Typescript refactor
        '@typescript-eslint/ban-types': 'warn', // TODO: убрать после Typescript refactor
        'consistent-return': 'warn', // TODO: убрать. Функции всегда явно возвращают результат
        'getter-return': 'warn', // TODO: убрать. Геттеры всегда явно возвращают результат
        'no-underscore-dangle': 'warn', // Разрешается использовать. Планируем постепенно отойти от такого паттерна
        '@typescript-eslint/naming-convention': 'off', // Разрешается использовать. Планируем постепенно отойти от такого паттерна
        'react/destructuring-assignment': 'off', // Можем использовать параметры и свойства без деструкторизации
        'jsx-a11y/label-has-associated-control': 'off', // Можем не связывать input и label
        'media-has-caption': 'off',
        'jsx-a11y/media-has-caption': 'off',
        'jsx-a11y/no-static-element-interactions': 'off', // Можем не давать роли html элементам
        'jsx-a11y/click-events-have-key-events': 'off', // Можем не давать click events элементам дополнительный слушатель keyboard
        'no-param-reassign': 'off', // Можем мутировать параметры внутри функции. Возможно включим.
        'class-methods-use-this': 'warn', // Или потом фиксим или выпиливаем классы
        'react/no-children-prop': 'off',
        'no-restricted-syntax': 'off', // TODO: придумать style-guide и включить правило
        'no-plusplus': 'off',
        'global-require': 'off', // TODO: избавиться после перевода на сервера на TS
        '@typescript-eslint/no-var-requires': 'off', // TODO: избавиться после перевода на сервера на TS
        'no-restricted-globals': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        'default-case': 'off',
        'max-params': ['warn', 2],
        'react/static-property-placement': 'off',
        'react/forbid-prop-types': 'off',
        'react/no-unused-prop-types': 'off',
        // "import/no-named-as-default": "warn"

        // "import/extensions": "off",
        'sort-imports': 'off',
        'import/order': 'off',
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': 1,
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: '*', next: 'return' },
        ],

        'react/jsx-uses-react': 1,
        'react-hooks/exhaustive-deps': 1,
        'react/react-in-jsx-scope': 'off',

        'react/require-default-props': 0,
        'react/jsx-props-no-spreading': 0,
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"]
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                'react/prop-types': 'off',
                // Продвинутая сортировка по модулям и в алфавитном порядке.
                'simple-import-sort/imports': [
                    'error',
                    {
                        groups: [
                            [
                                '^react',
                                '^@?\\w',
                                '^(@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)',
                            ],
                            ['^@base/.+', '^@image/.+'],
                            [
                                '^\\$+',
                                '^\\.\\.(?!/?$)',
                                '^\\.\\./?$',
                                '^\\./(?=.*/)(?!/?$)',
                                '^\\.(?!/?$)',
                                '^\\./?$',
                                '^.+\\.s?css$',
                            ],
                        ],
                    },
                ],
            },
        },
    ],
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {
                project: './tsconfig.json',
                alwaysTryTypes: true,
            },
        },
        'import/external-module-folders': [
            path.resolve(__dirname, 'dev_modules'),
        ],
    },
};
