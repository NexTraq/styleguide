module.exports = {
    '*.js': ['yarn lint:check:eslint'],
    '*.vue': ['yarn lint:check:eslint', 'yarn lint:check:stylelint'],
    '*.scss': ['yarn lint:check:stylelint'],
    '*.md': ['yarn lint:check:markdownlint'],
};
module.exports = {
    '*.js': [
        'yarn lint:check:eslint',
    ],
    '*.vue': [
        'yarn lint:check:eslint',
        'yarn lint:check:stylelint',
    ],
    '*.scss': [
        'yarn lint:check:stylelint',
    ],
    '*.md': [
        'yarn lint:check:markdownlint',
    ],
};
