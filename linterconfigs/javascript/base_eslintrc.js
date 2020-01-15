module.exports = {
    'plugins': ['jsdoc'],
    'parserOptions': {
        'sourceType': 'script',
    },
    'extends': [
        // https://github.com/vuejs/eslint-plugin-vue#bulb-rules
        'plugin:vue/recommended',
        // https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-installation
        'plugin:jsdoc/recommended',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard',
        // https://github.com/google/styleguide/blob/gh-pages/jsguide.html
        'google',
    ],
    'rules': {
        // Only allow debugger in development
        'no-debugger': process.env.PRE_COMMIT ? 'error' : 'off',
        // Only allow `console.log` in development
        'no-console': process.env.PRE_COMMIT ?
            ['error', { 'allow': ['warn', 'error'] }] :
            'off',
        'vue/array-bracket-spacing': 'error',
        'vue/arrow-spacing': 'error',
        'vue/block-spacing': 'error',
        'vue/brace-style': 'error',
        'vue/camelcase': 'error',
        'vue/comma-dangle': ['error', 'always-multiline'],
        'vue/component-name-in-template-casing': ['warning', 'kebab-case'],
        'vue/dot-location': ['error', 'property'],
        'vue/eqeqeq': 'error',
        'vue/key-spacing': 'error',
        'vue/keyword-spacing': 'error',
        'vue/no-boolean-default': ['error', 'default-false'],
        'vue/no-deprecated-scope-attribute': 'error',
        'vue/no-empty-pattern': 'error',
        'vue/object-curly-spacing': ['error', 'always'],
        'vue/space-infix-ops': 'error',
        'vue/space-unary-ops': 'error',
        'vue/v-on-function-call': 'error',
        'vue/v-slot-style': [
            'error',
            {
                'atComponent': 'v-slot',
                'default': 'v-slot',
                'named': 'longform',
            },
        ],
        'vue/valid-v-slot': 'error',
        'jsdoc/check-tag-names': [
            'warn',
            {
                'definedTags': ['vue-prop', 'vue-data', 'vue-computed', 'vue-event'],
            },
        ],
        'jsdoc/no-undefined-types': [
            'warn',
            {
                'definedTypes': ['VueComponent', 'VuexActionContext'],
            },
        ],
        'jsdoc/require-description': ['warn', { 'exemptedBy': ['param', 'returns'] }],
        'semi': ['error', 'always'], // This should be default, but doesn't seem to

        // Override Google configs
        'max-len': [
            'error',
            {
                'code': 120,
                'tabWidth': 4,
                'ignoreUrls': true,
            },
        ],
        'indent': [
            'error',
            4,
            {
                'CallExpression': {
                    'arguments': 2,
                },
                'FunctionDeclaration': {
                    'body': 1,
                    'parameters': 2,
                },
                'FunctionExpression': {
                    'body': 1,
                    'parameters': 2,
                },
                'MemberExpression': 2,
                'ObjectExpression': 1,
                'SwitchCase': 1,

                // TODO(https://nextraq.atlassian.net/browse/NTW-133)
                'ignoredNodes': ['ConditionalExpression'],
            },
        ],
        'require-jsdoc': 'warn',
        'jsdoc/require-returns': 'off', // Use @return instead
        'multiline-ternary': ['error', 'always-multiline'],
    },
    'settings': {
        'jsdoc': {
            'tagNamePreference': {
                'returns': 'return',
            },
        },
    },
};
