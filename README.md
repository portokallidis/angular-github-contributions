# Github-contributions

### Installation

Install via bower

```shell
bower install --save angular-github-contributions
```

Install via npm

```shell
npm install --save angular-github-contributions
```

### Usage

Add it as a dependency to your app :

```js
angular.module("myModule",["np.github-contributions"]);
```

And use by directive syntax as an element

```html
<github-contributions username="portokallidis"></github-contributions>
```

Available attributes
* username : a valid github username

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


### TODO

* add tests
* add more options

### License
MIT
