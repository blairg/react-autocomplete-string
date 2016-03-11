'use strict';

//Helper methods for the Autocomplete control to allow it to be tested properly.
var autocompleteHelper = new Object();

autocompleteHelper.isCaseSenstive = function(caseValue){
  return (caseValue !== undefined) ? caseValue : false;
};

autocompleteHelper.replaceAll = function(valueToFind, stringToReplaceValueIn, caseSensitive){
  var caseSensitive = this.isCaseSenstive(caseSensitive);
  var caseSensitiveFlag = caseSensitive ? 'g' : 'i';

  var returnValue = stringToReplaceValueIn.replace(new RegExp(valueToFind, caseSensitiveFlag), function (match) {
    return '<em>' + match + '</em>';
  });

  return returnValue;
};

autocompleteHelper.findMatchesInArray = function(valueToFind, caseSensitive, listOfValues, numResultsToReturn){

    var foundValues = [];

    for(var i = 0; i < listOfValues.sort().length; i++)
    {
        var found;

        if(caseSensitive) {
            found = listOfValues[i].search(valueToFind);
        }
        else {
            found = listOfValues[i].toLowerCase().search(valueToFind.toLowerCase());
        }

        if(found > -1)
        {
          if(foundValues.length < numResultsToReturn)
          {
              foundValues.push(listOfValues[i]);
              continue;
          }

          break;
        }
    }

    return foundValues;
};

autocompleteHelper.findMatchesStartsWithInArray = function(valueToFind, caseSensitive, listOfValues, numResultsToReturn){

  var foundValues = [];
  var foundStartingLetter = false;
  var keyedValueCaseApplied = caseSensitive ? valueToFind : valueToFind.toLowerCase();
  //done in the event of a large list to improve performance.
  var listOfValues = (valueToFind.toLowerCase().substring(0,1) < 'm') ? listOfValues.sort()
                                                                      : listOfValues.reverse();
  for(var i = 0; i < listOfValues.length; i++)
  {
      var value = (caseSensitive === true) ? listOfValues[i].substring(0, valueToFind.length)
                                           : listOfValues[i].substring(0, valueToFind.length).toLowerCase();

      if(value === keyedValueCaseApplied)
      {
          foundStartingLetter = true;

          if(foundValues.length < numResultsToReturn)
          {
              foundValues.push(listOfValues[i]);
              continue;
          }

          break;
      }
      else
      {
          if(foundStartingLetter === true)
          {
            break;
          }
      }
  }

  return foundValues;

};

autocompleteHelper.startsWithSurrondEm = function(valueToFind, fullValue){

    var firstKeyedChar = valueToFind.substring(0, 1);
    valueToFind = firstKeyedChar + valueToFind.substring(1, valueToFind.length);
    var valueToFindRemoved = fullValue.replace(valueToFind, '');

    return '<em>' + valueToFind + '</em>' + valueToFindRemoved + '</span>';

};

module.exports = autocompleteHelper;
