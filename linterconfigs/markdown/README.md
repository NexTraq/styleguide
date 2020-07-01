# Markdown

## Markdownlint

Most style validation and formatting for Markdown will be handled by Markdownlint. There are two versions of this
project: one written in [Ruby](https://github.com/markdownlint/markdownlint) and one written in
[Node](https://github.com/DavidAnson/markdownlint). The Node version seems to be more fully featured, overall, but
information about the Ruby version is left in case it better matches the engineer's preferences.

### Ruby

To use the Ruby version, start by installing it.

```bash
# If Ruby is not installed, install it first, then run:
gem install mdl
```

To run the checks, use the following command:

```bash
# TODO: Update with path when cross-repo solution is implemented
mdl -s <path/to/styleguide>/linterconfigs/markdown/style.rb <file pattern>
```

The Ruby version of Markdownlint does not currently support fixing lint errors.

### Node

In a NodeJS project, Markdownlint can be installed via yarn and managed in the ```package.json```:

```bash
yarn add markdownlint-cli
```

Then, from within a Node project, run:

```bash
yarn markdownlint -c <path/to/styleguide>/linterconfigs/markdown/style.rb \
        <file pattern>
```

To have Markdownlint format the files, add the ```--fix``` or ```-f``` option.

### CLI

In addition to the Node Markdownlint project, there is also a Node
[project](https://github.com/igorshubovych/markdownlint-cli) which provides a command line interface on top. To install
it, run:

```bash
yarn add global markdownlint-cli
```

Then, the checks can be run with just ```markdownlint``` outside of a Node project.

### Cases Not Handled

The ```line-length``` rule currently only allows for the following:

*   Checking for broken text after the line limit. For example:

    ```markdown
    Preceding text: pretendthistextistoolongbyitself andhereismoretext
    ```

    Triggers the rule, while the following does not:

    ```markdown
    Preceding text: pretendthistextistoolongbyitself

## Remark.js

There is another linting tool that was explored before Markdownlint implemented formatting functionality called
[Remark.js](https://github.com/remarkjs/remark). It is more robust in terms of extension and formatting capabilities,
but has proven difficult to configure properly. This is not in use currently, but this documentation is left in case
anyone ever wants to pick up the torch of investigating this.
