module.exports = {
    "extends": [
        // https://github.com/vuejs/eslint-plugin-vue#bulb-rules
        'plugin:vue/recommended',
    ],
    "rules": {
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
                atComponent: 'v-slot',
                default: 'v-slot',
                named: 'longform',
            },
        ],
        'vue/valid-v-slot': 'error',
        'vue/html-indent': ['error', 4],
        'vue/script-indent': [
            'error',
            4,
            {
                'baseIndent': 1,
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
    }
}
