# Qualifys

Series of tools to focus on your App's code quality.

## Installation

```sh
npm install -g qualifys

cd myproject/
qualifys init
```

You'll need to have **Node >= 4** on your machine. We recmommend you to use Node stable version as v4.4.x to use this QA tool.


## Philosophy

- **Only focus on Code quality**: we want to create this tool to make more react projects *testable*, *lintable*.
- **Pick it up, and use it**: we make QA process easier, you only need to install the tool and then run commands to start your QA process. 

## Usage

### Project Initializer

#### qualifys init

```sh
cd ~/project/myproject
qualifys init
```

This will add `.editorconfig`, `.eslintrc`, `.gitignore`, `.npmignore` to your project folder. And add `src/`, `dist/`, `test/` directory to your project if they don't exist.

### Test Intergated Development

#### qualifys run test

Before you use test tools, ensure to install `React` under your project.

```sh
# react 15.x.x required
npm install react
npm install react-dom
```

- `qualifys run test` to start test with `Karma`, `Mocha`, `Expect.js` and `enzyme`.
    + Test code support ES6.
    + Test code support `svg loader`, `json loader`.
- `qualifys run test -f 'test/testfile.js'` to start test with selected entry point.

We recmommend you to organize the test files under `test/` directory.

By default, you have to specify a `index.js` under the `test/` directory to declare which test files are going to be run.

```js
/**
 * only require other test-files here
 * include all of the files with form of *.test.js
 */

 const testFiles = require.context('.', false, /\.test\.js$/);
 testFiles.keys().forEach(testFiles);
```

#### qualifys run coverage

- `qualifys run coverage` to start generate a report of test coverage.

### Lint

- `qualifys run lint` to start lint code and generate a lint report.
- Here is a [guide](http://blog.surfacew.com/fe_tech/2016/07/25/Linter/) to make linting code live with your editor live.

### Help

- `qualifys --help` to show the commands help.


