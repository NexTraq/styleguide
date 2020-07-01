# Javascript

The primary linter to be used by Javscript projects is ESLint. Some Javascript projects may use other linters as well,
such as Stylelint. This repo contains a base ESLint configuration containing the required Javascript linting rules that
the ESLint config of another project can extend. Projects are free to add additional restrictions as they see fit, but
the NexTraq style guide should be followed in all cases where it is reasonably possible to do so. To use the base ESLint
config in this repo, import the repo into your project (TODO: Update with instructions once cross-repo solution is
decided upon) and extend ```base_eslintrc.js``` like so:

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
