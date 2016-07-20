# Input Error Framework
This repository includes an input field containing an error handling framework, alongside an alert panel and modal to
handle the default errors. Additional errors can be passed into the input directive and new validation types can be added.

Please try `gulp serve`-ing the app to try some demo input fields.

### Installation

Install via bower

```shell
bower install mdd-input-error-framework
```

### Usage

Add it as a dependency to your app and then use mdalton456.mdd-input-error-framework in your HTML files.

### Development

Install Gulp via npm if you don't have it
```shell
npm install -g gulp
```

### Available commands

* `gulp`: build and test the project
* `gulp build`: build the project and make new files in`dist`
* `gulp serve`: start a server to serve the demo page and launch a browser then watches for changes in `src` files to reload the page
* `gulp test`: run tests
* `gulp serve-test`: runs tests and keep test browser open for development. Watches for changes in source and test files to re-run the tests

##### Note

There are some intermittent (and environmental) problems with running the tests that I am in the process of resolving
