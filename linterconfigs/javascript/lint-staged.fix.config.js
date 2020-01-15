module.exports = {
    '*.js': [
        'yarn lint:fix:eslint',
        'git add',
        'yarn test:unit:file',
    ],
    '{!(package)*.json,*.code-snippets,.*rc}': [
        'yarn lint:fix:prettier --parser json',
        'git add',
    ],
    '*.vue': [
        'yarn lint:fix:eslint',
        'yarn lint:fix:stylelint',
        'git add',
        'yarn test:unit:file',
    ],
    '*.scss': [
        'yarn lint:fix:stylelint',
        'git add',
    ],
    '*.md': [
        'yarn lint:fix:markdownlint',
        'yarn lint:fix:prettier',
        'git add',
    ],
    '*.{png,jpeg,jpg,gif,svg}': [
        'imagemin-lint-staged',
        'git add',
    ],
};
