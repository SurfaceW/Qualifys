/**
 * only require other test-files here
 * include all of the files with form of *.test.js
 */

 const testFiles = require.context('.', false, /\.test\.js$/);
 testFiles.keys().forEach(testFiles);
