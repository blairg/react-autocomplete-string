//__tests__/react-autocomplete-string-test.js
'use strict';
//jest.autoMockOff();
jest.dontMock('../source/react-autocomplete-string.jsx');
jest.dontMock('../source/autocomplete-helper.js');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import AutoComplete from '../source/react-autocomplete-string.jsx';

const values = ["Aberdeen", "Almondbury", "Bath", "Bradford", "Basingstoke", "Huddersfield",
                "Halifax", "Hull", "Honley", "Harrogate", "Hadfield", "Holmfirth", "London",
                "Leeds", "Manchester", "Nottingham", "Plymouth", "Wolverhampton"];

describe('react-autocomplete-string - anywhere tests', () => {

  const autocompleteNode =( <AutoComplete values={values} numresults={10} search={'anywhere'} casesensitive={false} minimumkeystrokes={2}
                                          placeholder={'City name contains...'} />);
  var renderedItem;

  beforeEach(function() {
    renderedItem = TestUtils.renderIntoDocument(autocompleteNode);
  });

  it('should find Hull and Huddersfield', () => {
    var txt = 'hu';
    var input = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'input');
    //TestUtils.Simulate.keyDown(input, {key: 'a'});  // this doesn't work
    TestUtils.Simulate.change(input,  {target: {value: txt}});
    expect(input.value).toEqual(txt);

    var ul = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'ul');
    expect(ul.children.length).toEqual(2);
    expect(ul.children[0].innerHTML.indexOf('<em data="Huddersfield">Hu</em>ddersfield') > -1).toEqual(true);
    expect(ul.children[1].innerHTML.indexOf('<em data="Hull">Hu</em>ll') > -1).toEqual(true);
  });

  it('should find Manchester', () => {
    var txt = 'Manchester';
    var input = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'input');
    //TestUtils.Simulate.keyDown(input, {key: 'a'});  // this doesn't work
    TestUtils.Simulate.change(input,  {target: {value: txt}});
    expect(input.value).toEqual(txt);

    var ul = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'ul');
    expect(ul.children.length).toEqual(1);
    expect(ul.children[0].innerHTML.indexOf('<em data="Manchester">Manchester</em>') > -1).toEqual(true);
  });

  it('should find Hadfield and Huddersfield', () => {
    var txt = 'field';
    var input = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'input');
    //TestUtils.Simulate.keyDown(input, {key: 'a'});  // this doesn't work
    TestUtils.Simulate.change(input,  {target: {value: txt}});
    expect(input.value).toEqual(txt);

    var ul = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'ul');
    expect(ul.children.length).toEqual(2);
    expect(ul.children[0].innerHTML.indexOf('Had<em data="Hadfield">field</em>') > -1).toEqual(true);
    expect(ul.children[1].innerHTML.indexOf('Hudders<em data="Huddersfield">field</em>') > -1).toEqual(true);
  });

  it('should find no results as the value is empty', () => {
    var txt = '';
    var input = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'input');
    //TestUtils.Simulate.keyDown(input, {key: 'a'});  // this doesn't work
    TestUtils.Simulate.change(input,  {target: {value: txt}});
    expect(input.value).toEqual(txt);

    var ul = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'ul');
    expect(ul.children.length).toEqual(0);
  });

  it('should find no results as the value is invalid', () => {
    var txt = 'Invalid TOWN';
    var input = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'input');
    //TestUtils.Simulate.keyDown(input, {key: 'a'});  // this doesn't work
    TestUtils.Simulate.change(input,  {target: {value: txt}});
    expect(input.value).toEqual('');

    var ul = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'ul');
    expect(ul.children.length).toEqual(0);
  });

});

describe('react-autocomplete-string - startswith tests', () => {

  const autocompleteNode = (<AutoComplete values={values} numresults={10} search={'startswith'} casesensitive={false} minimumkeystrokes={1}
                                          placeholder={'City name starts with...'} />);
  var renderedItem;

  beforeEach(function() {
    renderedItem = TestUtils.renderIntoDocument(autocompleteNode);
  });

  it('should find Aberdeen and Almondbury', () => {
    var txt = 'A';
    var input = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'input');
    //TestUtils.Simulate.keyDown(input, {key: 'a'});  // this doesn't work
    TestUtils.Simulate.change(input,  {target: {value: txt}});
    expect(input.value).toEqual(txt);

    var ul = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'ul');
    expect(ul.children.length).toEqual(2);
    expect(ul.children[0].innerHTML.indexOf('<em data="Aberdeen">A</em>berdeen') > -1).toEqual(true);
    expect(ul.children[1].innerHTML.indexOf('<em data="Almondbury">A</em>lmondbury') > -1).toEqual(true);
  });

  it('should find Manchester', () => {
    var txt = 'Manchester';
    var input = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'input');
    //TestUtils.Simulate.keyDown(input, {key: 'a'});  // this doesn't work
    TestUtils.Simulate.change(input,  {target: {value: txt}});
    expect(input.value).toEqual(txt);

    var ul = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'ul');
    expect(ul.children.length).toEqual(1);
    expect(ul.children[0].innerHTML.indexOf('<em data="Manchester">Manchester</em>') > -1).toEqual(true);
  });

  it('should find no results as the value is empty', () => {
    var txt = '';
    var input = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'input');
    //TestUtils.Simulate.keyDown(input, {key: 'a'});  // this doesn't work
    TestUtils.Simulate.change(input,  {target: {value: txt}});
    expect(input.value).toEqual(txt);

    var ul = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'ul');
    expect(ul.children.length).toEqual(0);
  });

  it('should find no results as the value is invalid', () => {
    var txt = 'Invalid TOWN';
    var input = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'input');
    //TestUtils.Simulate.keyDown(input, {key: 'a'});  // this doesn't work
    TestUtils.Simulate.change(input,  {target: {value: txt}});
    expect(input.value).toEqual('');

    var ul = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'ul');
    expect(ul.children.length).toEqual(0);
  });

});
