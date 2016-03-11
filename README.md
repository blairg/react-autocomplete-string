# React Autocomplete String

[[Project URL]()

On Windows install python 2.7.11
Set environment variable on Windows
npm install gulp -g
npm install react
npm install react-tools -g
npm install bower -gnpm install gulp-newer
npm install


> This project template is an autocomplete component for React.

### Directory Layout

```
.
├── /assets/                    # The source code of the application
│   ├── /config/                # Contains React-Tools preprocessor file.
│   ├── /css/                   # Transpilied SASS files.
│   ├── /js/                    # Javascript files which are the autocomplete component.
│   ├── /scss/                  # SASS files which need transpiling to CSS.
├── /build/                     # The folder for compiled output
├── /config/                    # Configuration files.
├── /node_modules/              # 3rd-party libraries and utilities
│── gulpfile.js                 # Configuration file for automated builds
│── index.html                  # Page to demo the autocomplete component
└── package.json                # The list of 3rd party libraries and utilities
```

### Getting Started

Just [clone](github-windows://openRepo/https://github.com/blairg/react-autocomplete-string) or [fork](https://github.com/blairg/react-autocomplete-string/fork) the repo and start hacking:

```shell
$ git clone -o upstream https://github.com/blairg/react-autocomplete-string.git MyApp
$ cd MyApp
$ npm install -g gulp           # Install Gulp task runner globally
$ npm install                   # Install Node.js components listed in ./package.json
```

### How to Build

```shell
$ gulp build
```

### How to Run

```shell
$ gulp
```

This will start a lightweight development server with LiveReload and
synchronized browsing across multiple devices and browsers.

### How to Update

You can always fetch and merge the recent changes from this repo back into
your own project:

```shell
$ git checkout master
$ git fetch upstream
$ git merge upstream/master
$ npm install
```

### How to Test

Run unit tests powered by [Jest](https://facebook.github.io/jest/) with the following
[npm](https://www.npmjs.org/doc/misc/npm-scripts.html) command:

```shell
$ npm test
```

### How to Style The Component

Override the below styles. In a future release I will allow styles to be passed to the control.

```shell
.autocomplete {
  width: 125px; }

.autocompleteContainer {
  list-style-type: none;
  margin-left: 0px;
  border-style: solid;
  border-width: 1px;
  width: 150px;
  overflow: hidden;
  padding: 0;
  z-index: 99999; }

.autocompleteContainer li {
  margin-left: 0px; }

.autocompleteContainer li em {
  background: #66FF33;
  font-weight: bold;
  font-style: normal; }

/* unvisited link */
#autocompleteContainer a:link {
  color: #FF0000; }

/* visited link */
#autocompleteContainer a:visited {
  color: #00FF00; }

/* mouse over link */
#autocompleteContainer a:hover {
  color: #FF00FF; }

/* selected link */
#autocompleteContainer a:active {
  color: #0000FF; }
```

### Learn More

 * [Getting Started with React.js](http://facebook.github.io/react/)
 * [React.js Wiki on GitHub](https://github.com/facebook/react/wiki)
 * [React.js Questions on StackOverflow](http://stackoverflow.com/questions/tagged/reactjs)
 * [React.js Discussion Board](https://groups.google.com/forum/#!forum/reactjs)
 * [Jest - Painless Unit Testing](http://facebook.github.io/jest/)
 * [The Future of React](https://github.com/reactjs/react-future)

### Support

Have feedback, feature request or need help? Contact me on (blair.garrett1@gmail.com)
