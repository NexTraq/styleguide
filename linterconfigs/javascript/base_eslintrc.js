module.exports = {
    'plugins': ['jsdoc'],
    'parserOptions': {
        'sourceType': 'script',
    },
    'extends': [
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
            ['error', { 'allow': ['warn', 'error'] }] : 'off',
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
