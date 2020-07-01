# Linter Configs

These files configure the various linters to be used by engineers and CI. If you encounter any cases where these configs
conflict with the style guide. Please make an effort to fix them and, if it is not possible, please document them here.
Each subdirectory has its own README for more details.

NOTE: This is a work in progress.

## Multi-Language Tools and Configs

JSON and HTML formatting will be handled by [Prettier](https://prettier.io). Unfortunately, there is no "check" setting
for Prettier, so it will not be included in the CI process. To run Prettier, first import the repo into your project
(TODO: Update with instructions once cross-repo solution is decided upon), then run the following command:

```bash
# TODO: Update with path when cross-repo solution is implemented
prettier --write --config <path/to/repo>/linterconfigs/.prettierrc.js \
    "**/*.{json,html,md}"
```

For the time being, we will also be using Prettier for Markdown file formatting. This is because the Markdownlint
functionality for line length is broken ([ticket](https://github.com/markdownlint/markdownlint/issues/295), and support
for formatting line length is explicitly not planned.

### EditorConfig

There is also a tool called [EditorConfig](https://editorconfig.org/) which integrates with IDEs to make it easier to
ensure it stays in compliance with linting rules. This config is usable across any languages, though is limited in scope
for some of them. To use it, first install the corresponding EditorConfig plugin for your IDE/editor. Then, import the
repo into your project (TODO: Update with instructions once cross-repo solution is decided upon). Unfortunately, you
must then copy the ```.editorconfig``` file from the repo directory (TODO: Mention the repo directory here) to the root
directory of the project (TODO: Create a cross-repo build target for this). Be sure to add it to the ```.gitignore```.
Note that it is possible to override the ```.editorconfig``` in subdirectories.
