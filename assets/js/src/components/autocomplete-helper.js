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
    return "<em data='" + stringToReplaceValueIn + "'>" + match + "</em>";
  });

  return returnValue;
};

autocompleteHelper.findMatchesInArray = function(valueToFind, caseSensitive, listOfValues, numResultsToReturn){

    var foundValues = [];
    var listOfValues = listOfValues.filter(function(item, i, ar){ return ar.indexOf(item) === i; });

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
  var listOfValues = listOfValues.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
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

    var getStartingChars = fullValue.substring(0, valueToFind.length);
    return "<em data='" + fullValue + "'>" + getStartingChars + "</em>" + fullValue.substring(valueToFind.length);

};

autocompleteHelper.numberOfKeyStrokesReached = function(keyedValue, minimumNumberOfStrokesReached){

    if(keyedValue === undefined || minimumNumberOfStrokesReached === undefined || isNaN(minimumNumberOfStrokesReached))
    {
      return false;
    }

    return keyedValue.length >= minimumNumberOfStrokesReached;
};

module.exports = autocompleteHelper;
