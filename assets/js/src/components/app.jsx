"use strict"

import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from './react-autocomplete-string.jsx';

const values = ["Aberdeen", "Almondbury", "Bath", "Bradford", "Basingstoke", "Huddersfield",
                "Halifax", "Hull", "Honley", "Harrogate", "Hadfield", "Holmfirth", "London",
                "Leeds", "Manchester", "Nottingham", "Plymouth", "Wolverhampton"];

class App extends React.Component {
  render() {
    return <AutoComplete values={values} numresults={2} search={'anywhere'} casesensitive={false} />;
  }
}

ReactDOM.render(<App />, document.getElementById("react-autocomplete"));
