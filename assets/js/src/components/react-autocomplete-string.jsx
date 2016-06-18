 /*
 * React.js - Autocomplete-string
 * 2016 - Blair Garrett
 */

'use strict';

import React from 'react';
import AutoCompleteHelper from './autocomplete-helper';

export default class AutoComplete extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          NumResults : props.numresults,
          CaseSensitive : props.casesensitive,
          Values : props.values,
          SearchType : props.search,
          MinimumKeyStrokes : props.minimumkeystrokes,
          PlaceHolder : props.placeholder,
          FoundValues: [],
          SelectedValue: '',
          KeyedValue: ''
      };

      //bind event handlers
      this.handleSelectOption = this.handleSelectOption.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    var keyedValue = e.target.value;

    if(keyedValue === '')
    {
      this.setState({FoundValues: []});
      this.setState({SelectedValue: ''});
      this.setState({KeyedValue: ''});
      return;
    }

    var minimumKeyStrokes = this.state.MinimumKeyStrokes;
    var numResults = this.state.NumResults !== undefined ? this.state.NumResults : 0;
    var foundValues = [];
    var caseSensitive = AutoCompleteHelper.isCaseSenstive(this.state.CaseSensitive);
    var values = this.state.Values;
    var searchType = this.state.SearchType;

    if(searchType === undefined)
    {
      searchType = 'startswith';
    }

    var selectedValue = this.state.SelectedValue;

    if(selectedValue !== '')
    {
      this.setState({SelectedValue: keyedValue});
    }

    if(minimumKeyStrokes !== undefined)
    {
      var enoughKeyStrokes = AutoCompleteHelper.numberOfKeyStrokesReached(keyedValue, minimumKeyStrokes);

      if(!enoughKeyStrokes)
      {
        this.setState({FoundValues: []});
        this.setState({KeyedValue: keyedValue});
        return;
      }
    }

    switch(searchType)
    {
      case 'anywhere' :
          foundValues = AutoCompleteHelper.findMatchesInArray(keyedValue, caseSensitive, values, numResults);
        break;
      case 'startswith' :
          foundValues = AutoCompleteHelper.findMatchesStartsWithInArray(keyedValue, caseSensitive, values, numResults);
         break;
    }

    if(foundValues.length > 0)
    {
      this.setState({FoundValues: foundValues});
      this.setState({KeyedValue: keyedValue});
      return;
    }

    this.setState({FoundValues: []});
    this.setState({KeyedValue: ''});
  }

  handleSelectOption(e){
      e.preventDefault();

      var value = e.target.nodeName === "EM" ? e.target.attributes.data.value : e.target.innerText;

      if(value !== '')
      {
          this.setState({SelectedValue: value});
          this.setState({FoundValues: []});
      }
  }

  render() {
      var foundValuesLength = this.state.FoundValues.length;
      var ulStyle = foundValuesLength > 0 ? 'autocompleteContainerUl' : '';
      var values = foundValuesLength > 0 ? this.state.FoundValues : [];
      var selectedValue = this.state.SelectedValue;
      var keyedValue = this.state.KeyedValue;
      var searchType = this.state.SearchType;
      var caseSensitive = AutoCompleteHelper.isCaseSenstive(this.state.CaseSensitive);
      var placeHolder = this.state.PlaceHolder !== undefined ? this.state.PlaceHolder : '';

      if(selectedValue === '')
      {
          selectedValue = keyedValue;
      }

      return
        <div id="autocompleteContainer" className="autocomplete">
          <input type="search" className="TextBox-input" ref="inputAutocomplete" key="inputAutocomplete"
                 onChange={this.handleChange} value={selectedValue} placeholder={placeHolder} />
                 <div id="resultsList">
                   <ul className={ulStyle} ref="selectAutocomplete">
                     {values.map(function(result) {
                       switch(searchType)
                       {
                         case 'anywhere' :
                            var emsApplied = AutoCompleteHelper.replaceAll(keyedValue, result, caseSensitive);
                            return <li key={result} onClick={this.handleSelectOption}><span dangerouslySetInnerHTML={{__html: emsApplied}} /></li>;
                         break;
                         case 'startswith' :
                            var emsApplied = AutoCompleteHelper.startsWithSurrondEm(keyedValue, result);
                            return <li key={result} onClick={this.handleSelectOption}><span dangerouslySetInnerHTML={{__html: emsApplied}} /></li>;
                         break;
                       }
                     }.bind(this))}
                   </ul>
                 </div>
         </div>
      ;
  }
}
