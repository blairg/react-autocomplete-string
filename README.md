# React Autocomplete String

[Source Code - Github](https://github.com/blairg/react-autocomplete-string)

[Demo Site](http://139.59.167.176/)

The current build has been tested with Node.js 5.7.0.

> This project template is an autocomplete component for React.

### Directory Layout

```
.
├── /assets/                    # The source code of the application
│   ├── /css/                   # Transpilied SASS files.
│   ├── /images/                # Images used by the demo site.
│   ├── /js/                    # Javascript files which are the autocomplete component.
│   ├── /scss/                  # SASS files which need transpiling to CSS.
├── /build/                     # The folder for compiled output
├── /node_modules/              # 3rd-party libraries and utilities
│── index.html                  # Page to demo the autocomplete component
└── package.json                # The list of 3rd party libraries and utilities
```

### Getting Started

Just [clone](https://github.com/blairg/react-autocomplete-string.git) or [fork](https://github.com/blairg/react-autocomplete-string/fork) the repo and start hacking:

```shell
$ git clone -o upstream https://github.com/blairg/react-autocomplete-string.git MyApp
$ cd MyApp
$ npm install gulp -g                          # Install Gulp task runner globally
$ npm install bower -gnpm                      # Install Bower globally
$ npm install babel-preset-es2015              # Install babel ES6 transpiler golbally.
$ npm install                                  # Install Node.js components listed in ./package.json
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

### How to use the autocomplete component

The component accepts the following parameters: -
* numresults - The number of results you want the autocomplete search to return.
* casesensitive - True for case senstive when searching the values object or false for case insensitive.
* values - An array of string elements.
* search - An enum for the type of search being either 'startswith' (The beginning of the string) or 'anywhere' (Anywhere within the string).
* minimumkeystrokes - The number (Integer) of key strokes before the results are rendered.
* placeholder - Placeholder text for the search box.

A typical usage of the component is found below. The example below assumes an element such as a div with the id of 'react-autocomplete'.

```js
"use strict"

import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from './react-autocomplete-string.jsx';

const values = ["Aberdeen", "Almondbury", "Bath", "Bradford", "Basingstoke", "Huddersfield",
                "Halifax", "Hull", "Honley", "Harrogate", "Hadfield", "Holmfirth", "London",
                "Leeds", "Manchester", "Nottingham", "Plymouth", "Wolverhampton"];

class App extends React.Component {
  render() {
    return <AutoComplete values={values} numresults={2} search={'anywhere'} casesensitive={false} minimumkeystrokes={2}
                         placeholder={'search by town...'} />;
  }
}

ReactDOM.render(<App />, document.getElementById("react-autocomplete"));
```

### How to Style The Component

Override the below styles. In a future release I will allow styles to be passed to the control.

```css
$searchTextPlaceholderColor: #303a28;
$backgroundColor: #343434;

body{
  background: $backgroundColor;
}

.reactLogo{
  position: relative;
  left: 40%;
  top: 10px;
}

#autocompleteContainer{
    width: 94%;
    display: block;
    margin-left: 3%;
    margin-right: 3%;
    max-width: 100%;
    margin-top: 5%;
    text-align: center;

    #resultsList{
        position: relative;
        background-color: #FFFFFF;
        width: 80%;
        left: 10%;
        top: 0%;
        margin-top: -1%;

        li {
          margin-left: -4%;
          text-align: center;
          list-style-type: none;

          &:hover{
            background-color: #c4baba;
          }

          em{
            font-style: normal;
            font-weight: bold;
          }

          a{
            text-decoration: none;
            color: $backgroundColor;
          }
        }
    }
}

.TextBox-input{
  color: #9DDD66;
  background-color: #0E0F0D;
  border-radius: 25px;
  width: 80%;
  height: 5%;
  font-size: 30pt;
  border: 2px solid $searchTextPlaceholderColor;
  padding-left: 1%;
  text-align: center;
}

::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color:   $searchTextPlaceholderColor;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
   color:    $searchTextPlaceholderColor;
   opacity:  1;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
   color:    $searchTextPlaceholderColor;
   opacity:  1;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
   color:    $searchTextPlaceholderColor;
}
:placeholder-shown { /* Standard (https://drafts.csswg.org/selectors-4/#placeholder) */
  color:     $searchTextPlaceholderColor;
}
```

### Future development

There is a public Trello board which I will be tracking new features and bugs for the component. Currently it's only me on the project, but if anyone else comes board, then I add others to the board and the Github project.

[Trello Board](https://trello.com/b/S6afejn6)

### Learn More

 * [Getting Started with React.js](http://facebook.github.io/react/)
 * [React.js Wiki on GitHub](https://github.com/facebook/react/wiki)
 * [React.js Questions on StackOverflow](http://stackoverflow.com/questions/tagged/reactjs)
 * [React.js Discussion Board](https://groups.google.com/forum/#!forum/reactjs)
 * [Jest - Painless Unit Testing](http://facebook.github.io/jest/)
 * [The Future of React](https://github.com/reactjs/react-future)

### Support

Have feedback, feature request or need help? Contact me on [email](mailto:blair.garrett1@gmail.com)
