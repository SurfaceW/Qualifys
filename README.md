# Qualifys

> Qualifys is a basic tool for Higher Qualify Code and Coding porcdures.

## Usage

### Project Initializer

- under a project directory run `qualifys init`

### Test Intergated Development

- `qualifys run test` to start test development with Karma, Mocha and Expect.js
    - `qualifys run test -f 'test/testfile.js'` to start test with selected entry point.
- `qualifys run coverage` to start generate a report of test coverage.

> The test files should be organized in the following way:

By default, you have to specify a `index.js` under the `test/` directory to tell which test files are going to be run.

```js
/**
 * only require other test-files here
 * include all of the files with form of *.test.js
 */

 const testFiles = require.context('.', false, /\.test\.js$/);
 testFiles.keys().forEach(testFiles);
```

### Lint

- `qualifys run lint` to start lint code
- Here is a [guide](http://blog.surfacew.com/fe_tech/2016/07/25/Linter/) to make linting code live with Sublime Linter.



