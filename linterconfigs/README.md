# Linter Configs

These files configure the various linters to be used by engineers and CI. If you
encounter any cases where these configs conflict with the style guide. Please
make an effort to fix them and, if it is not possible, please document them
here.
NOTE: This is a work in progress.

## Java

There are two separate linting programs to handle checks and formatting for
java.

### Check

Java style checks will use Checkstyle. It is easy to install checkstyle with
your favorite package manager. This is the program that will perform lint checks
in the CI process. To run checkstyle locally, use the following command:

```bash
checkstyle -c nextraq_checkstyle.xml <files to check>
```

### Format

Java formatting will use Spotless configured with the Eclipse format step, using
[eclipse-java-nextraq-style.xml](../../ideconfigs/eclipse-java-nextraq-style.xml).
To use Spotless, import this repo into your project (TODO: Update with
instructions once cross-repo solution is decided upon) and apply
```spotless.gradle``` in your ```build.gradle``` following the example in
```example.build.gradle```.

Run Spotless using the following command:

```bash
gradle spotlessApply
```

or

```bash
gradlew spotlessApply
```

#### Cases Not Handled By Formatter

Spotless will not remove extraneous newlines before closing brace of a block.

## Javascript

The primary linter to be used by Javscript projects is ESLint. Some Javascript
projects may use other linters as well, such as Stylelint. This repo contains
a base ESLint configuration containing the required Javascript linting rules
that the ESLint config of another project can extend. Projects are free to add
additional restrictions as they see fit, but the NexTraq style guide should be
followed in all cases where it is reasonably possible to do so. To use the base
ESLint config in this repo, import the repo into your project (TODO: Update with
instructions once cross-repo solution is decided upon) and extend
```base_eslintrc.js``` like so:

```js
module.exports = {
    .
    .
    .
    extends: [
        // TODO: Update with path when cross-repo solution is implemented
        '<path/to/repo>/linterconfigs/javascript/base_eslintrc.js',
    ],
    .
    .
    .
}
```

In general, run ESLint checks like so:

```bash
yarn eslint --ext .js .
```

If you want to lint other types of files, such as Vue files, modify the command
to include them:

```bash
yarn eslint --ext .js,<additional_file_ext> .
```

To have ESLint format the files, add the ```--fix``` option.
It would be wise to configure this as scripts in ```package.json```.

## Markdown

### Markdownlint

Most style validation and formatting for Markdown will be handled by
Markdownlint. There are two versions of this project: one written in
[Ruby](https://github.com/markdownlint/markdownlint) and one written in
[Node](https://github.com/DavidAnson/markdownlint). The Node version seems to be
more fully featured, overall, but information about the Ruby version is left in
case it better matches the engineer's preferences.

#### Ruby

To use the Ruby version, start by installing it.

```bash
# If Ruby is not installed, install it first
gem install mdl
```

To run the checks, use the following command:

```bash
# TODO: Update with path when cross-repo solution is implemented
mdl -s <path/to/styleguide>/linterconfigs/markdown/style.rb <file pattern>
```

The Ruby version of Markdownlint does not currently support fixing lint errors.

#### Node

In a NodeJS project, Markdownlint can be installed via yarn and managed in the
```package.json```:

```bash
yarn add markdownlint-cli
```

Then, from within a Node project, run:

```bash
yarn markdownlint -c <path/to/styleguide>/linterconfigs/markdown/style.rb \
        <file pattern>
```

In addition to the Node Markdownlint project, there is also a Node
[project](https://github.com/igorshubovych/markdownlint-cli) which
provides a command line interface on top. To install it, run:

```bash
yarn add global markdownlint-cli
```

Then, the checks can be run with just ```markdownlint``` outside of a Node
project.

To have Markdownlint format the files, add the ```--fix``` or ```-f``` option.

### Remark.js

There is another linting tool that was explored before Markdownlint implemented
formatting functionality called [Remark.js](https://github.com/remarkjs/remark).
Using it is probably not necessary, but the configuration is left for posterity
and in case it is ever useful again.

## Multi-Language

JSON and HTML formatting will be handled by [Prettier](https://prettier.io).
Unfortunately, there is no "check" setting for Prettier, so it will not be
included in the CI process. To run Prettier, first import the repo into your
project (TODO: Update with instructions once cross-repo solution is decided
upon), then run the following command:

```bash
# TODO: Update with path when cross-repo solution is implemented
prettier --write --config <path/to/repo>/linterconfigs/.prettierrc.js \
    "**/*.{json,html,md}"
```

For the time being, we will also be using Prettier for Markdown file formatting.
This is because the Markdownlint functionality for line length is broken
([ticket](https://github.com/markdownlint/markdownlint/issues/295), and support
for formatting line length is explicitly not planned.

### EditorConfig

There is also a tool called [EditorConfig](https://editorconfig.org/) which
integrates with IDEs to make it easier to ensure it stays in compliance
with linting rules. This config is usable across any languages, though is
limited in scope for some of them. To use it, first install the corresponding
EditorConfig plugin for your IDE/editor. Then, import the repo into your
project (TODO: Update with instructions once cross-repo solution is decided
upon). Unfortunately, you must then copy the ```.editorconfig``` file from the
repo directory (TODO: Mention the repo directory here) to the root directory of
the project (TODO: Create a cross-repo build target for this). Be sure to add it
to the ```.gitignore```. Note that it is possible to override the
```.editorconfig``` in subdirectories.
