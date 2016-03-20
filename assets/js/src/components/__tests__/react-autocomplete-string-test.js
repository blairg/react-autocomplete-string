// __tests__/react-autocomplete-string-test.js
//jest.autoMockOff();
jest.dontMock('../react-autocomplete-string.jsx');
jest.dontMock('../autocomplete-helper');

//var React = require('react');
//var ReactDOM = require('react-dom');
//var TestUtils = require('react-addons-test-utils');

//var Autocomplete = require('../react-autocomplete-string.jsx');

describe('react-autocomplete-string', function() {

  var values = ['Aberdeen', 'Almondbury', 'Bath', 'Bradford', 'Huddersfield', 'Halifax', 'Hull',
                'Honley', 'Harrogate', 'Hadfield', 'Holmfirth', 'London',
                'Leeds', 'Manchester', 'Nottingham', 'Plymouth', 'Wolverhampton'];

  var autocompleteControl;
  var container = document.createElement("div");

  beforeEach(function() {
      // This component does not use any lifecycle methods or broadcast
      // events so it does not require rendering to the DOM to be tested.
      //autocompleteControl = TestUtils.renderIntoDocument(<Autocomplete values={values} numResults={5} search={'startsWith'} />);
    });

  afterEach(function() {
    //if (autocompleteControl && autocompleteControl.isMounted()) {
      // Only components with a parent will be unmounted
      //React.unmountComponentAtNode(React.findDOMNode(autocompleteControl).parentNode);
    //}
  });


  it('changes the text after click', function() {

    // Render a checkbox with label in the document
    /*var autocompleteControl = TestUtils.renderIntoDocument(
      <Autocomplete values={values} numResults={5} search={'startsWith'} />
    );*/

    //var autocompleteNode = ReactDOM.findDOMNode(autocompleteControl);

    //console.dir(autocompleteNode);
    //console.log(":" + autocompleteNode.textContent + ";");

    //var div = TestUtils.findRenderedDOMComponentWithTag(autocompleteControl, 'div');

    //console.log(div.getDOMNode().textContent);

    //var shallowRenderer = TestUtils.createRenderer();
    //shallowRenderer.render(<Autocomplete values={values} numResults={5} search={'startsWith'} />);

    //var result = shallowRenderer.getRenderOutput();

    //console.dir(result);
    //console.log(result);
    //console.log(result.props.children.length);

    //for(var i = 0; i < result.props.children.length; i++)
    //{
      //  console.log(result.props.children[i]);
    //}

    /*var autocompleteTextbox = TestUtils.findRenderedDOMComponentWithClass(autocompleteControl, 'TextBox-input');

    TestUtils.Simulate.keyUp(autocompleteTextbox, {key: "H", keyCode: 72, which: 72});
    TestUtils.Simulate.keyUp(autocompleteTextbox, {key: "u", keyCode: 85, which: 85});
    TestUtils.Simulate.keyUp(autocompleteTextbox, {key: "d", keyCode: 68, which: 68});*/

    //var autocompleteUl = TestUtils.findRenderedDOMComponentWithTag(autocompleteNode, 'ul');
    //console.log(TestUtils.findRenderedDOMComponentWithClass(autocompleteControl, 'TextBox-input'));

  //  console.dir(autocompleteUl);
  //  console.log(":" + autocompleteUl.textContent + ";");

    // Verify that it's Off by default
    //expect(autocompleteNode.textContent).toContain("Huddersfield");
  });

});
