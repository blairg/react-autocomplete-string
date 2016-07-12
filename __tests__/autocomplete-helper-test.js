// __tests__/autocomplete-helper-test.js
jest.autoMockOff();
jest.dontMock('../source/autocomplete-helper');

var autocompleteHelper = require('../source/autocomplete-helper');

describe('isCaseSenstive tests', function() {

 it('returns true for case sensitive', function() {
   expect(autocompleteHelper.isCaseSenstive(true)).toBe(true);
 });

 it('returns false for case sensitive', function() {
   expect(autocompleteHelper.isCaseSenstive(false)).toBe(false);
 });

 it('returns false for case sensitive if no value is passed', function() {
   expect(autocompleteHelper.isCaseSenstive()).toBe(false);
 });

});

describe('replaceAll tests', function() {

 it('should find Hud in Huddersfield - case insensitive', function() {
   expect(autocompleteHelper.replaceAll("Hud", "Huddersfield")).toBe("<em data='Huddersfield'>Hud</em>dersfield");
 });

 it('should find Hud in Huddersfield - case sensitive', function() {
   expect(autocompleteHelper.replaceAll("Hud", "Huddersfield", true)).toBe("<em data='Huddersfield'>Hud</em>dersfield");
 });

 it('should not find Hud in Huddersfield - case sensitive', function() {
   expect(autocompleteHelper.replaceAll("hud", "Huddersfield", true)).toBe("Huddersfield");
 });

 it('should find field in Huddersfield - case sensitive', function() {
   expect(autocompleteHelper.replaceAll("field", "Huddersfield", true)).toBe("Hudders<em data='Huddersfield'>field</em>");
 });

 it('should find field in Huddersfield - case insensitive', function() {
   expect(autocompleteHelper.replaceAll("field", "Huddersfield")).toBe("Hudders<em data='Huddersfield'>field</em>");
 });

});

describe('findMatchesInArray tests', function() {

   var testValues = ['Aberdeen', 'Almondbury', 'Bath', 'Bradford', 'Huddersfield', 'Halifax', 'Hull',
                     'Honley', 'Harrogate', 'Hadfield', 'Holmfirth', 'London',
                     'Leeds', 'Manchester', 'Nottingham', 'Plymouth', 'Wolverhampton'];

   it('should find no results', function() {
      var caseSensitive = true;
      var numResultsToReturn = 1;
      var valueToFind = "I'm not in here";
      var foundValues = autocompleteHelper.findMatchesInArray(valueToFind, caseSensitive, testValues, numResultsToReturn);

      expect(foundValues.length).toBe(0);
      expect(foundValues.indexOf(valueToFind) > -1).toBe(false);
   });

   it('should find only Leeds - case sensitive', function() {
      var caseSensitive = true;
      var numResultsToReturn = 1;
      var valueToFind = "Leeds";
      var foundValues = autocompleteHelper.findMatchesInArray(valueToFind, caseSensitive, testValues, numResultsToReturn);

      expect(foundValues.length).toBe(1);
      expect(foundValues.indexOf(valueToFind) > -1).toBe(true);
   });

   it('should find only Leeds - case insensitive', function() {
      var caseSensitive = false;
      var numResultsToReturn = 1;
      var valueToFind = "Leeds";
      var foundValues = autocompleteHelper.findMatchesInArray(valueToFind, caseSensitive, testValues, numResultsToReturn);

      expect(foundValues.length).toBe(1);
      expect(foundValues.indexOf(valueToFind) > -1).toBe(true);
   });

   it('should find all values starting with H - case sensitive', function() {
      var caseSensitive = true;
      var numResultsToReturn = 10;
      var valueToFind = "H";
      var foundValues = autocompleteHelper.findMatchesInArray(valueToFind, caseSensitive, testValues, numResultsToReturn);

      expect(foundValues.length).toBe(7);
      expect(foundValues.indexOf('Huddersfield') > -1).toBe(true);
      expect(foundValues.indexOf('Halifax') > -1).toBe(true);
      expect(foundValues.indexOf('Hull') > -1).toBe(true);
      expect(foundValues.indexOf('Honley') > -1).toBe(true);
      expect(foundValues.indexOf('Harrogate') > -1).toBe(true);
      expect(foundValues.indexOf('Hadfield') > -1).toBe(true);
      expect(foundValues.indexOf('Holmfirth') > -1).toBe(true);
   });


    it('should find only Leeds and return 1 result - case sensitive', function() {
        var caseSensitive = true;
        var numResultsToReturn = 1;
        var valueToFind = "Le";
        var values = ['Leeds', 'Leicester'];
        var foundValues = autocompleteHelper.findMatchesInArray(valueToFind, caseSensitive, values, numResultsToReturn);

        expect(foundValues.length).toBe(1);
        expect(foundValues.indexOf('Leeds') > -1).toBe(true);
    });

});

describe('findMatchesStartsWithInArray tests', function() {

   var testValues = ['Aberdeen', 'Almondbury', 'Bath', 'Bradford', 'Hadfield', 'Halifax',
                     'Harrogate', 'Holmfirth', 'Honley', 'Huddersfield', 'Hull', 'London',
                     'Leeds', 'Manchester', 'Nottingham', 'Plymouth', 'Wolverhampton'];

   it('should find no results', function() {
      var caseSensitive = true;
      var numResultsToReturn = 5;
      var valueToFind = "Not in the list";
      var foundValues = autocompleteHelper.findMatchesStartsWithInArray(valueToFind, caseSensitive, testValues, numResultsToReturn);

      expect(foundValues.length).toBe(0);
      expect(foundValues.indexOf(valueToFind) > -1).toBe(false);
   });

   it('should find only Aberdeen and Almondbury - case sensitive', function() {
      var caseSensitive = true;
      var numResultsToReturn = 5;
      var valueToFind = "A";
      var foundValues = autocompleteHelper.findMatchesStartsWithInArray(valueToFind, caseSensitive, testValues, numResultsToReturn);

      expect(foundValues.length).toBe(2);
      expect(foundValues.indexOf("Aberdeen") > -1).toBe(true);
      expect(foundValues.indexOf("Almondbury") > -1).toBe(true);
   });

    it('should find only Aberdeen - case sensitive', function() {
        var caseSensitive = true;
        var numResultsToReturn = 1;
        var valueToFind = "A";
        var foundValues = autocompleteHelper.findMatchesStartsWithInArray(valueToFind, caseSensitive, testValues, numResultsToReturn);

        expect(foundValues.length).toBe(1);
        expect(foundValues.indexOf("Aberdeen") > -1).toBe(true);
    });

   it('should find only Almondbury - case insensitive', function() {
     var caseSensitive = false;
     var numResultsToReturn = 5;
     var valueToFind = "alm";
     var foundValues = autocompleteHelper.findMatchesStartsWithInArray(valueToFind, caseSensitive, testValues, numResultsToReturn);

     expect(foundValues.length).toBe(1);
     expect(foundValues.indexOf("Almondbury") > -1).toBe(true);
   });

   it('should find all values starting with H - case sensitive', function() {
      var caseSensitive = true;
      var numResultsToReturn = 10;
      var valueToFind = "H";
      var foundValues = autocompleteHelper.findMatchesStartsWithInArray(valueToFind, caseSensitive, testValues, numResultsToReturn);

      expect(foundValues.length).toBe(7);
      expect(foundValues.indexOf('Huddersfield') > -1).toBe(true);
      expect(foundValues.indexOf('Halifax') > -1).toBe(true);
      expect(foundValues.indexOf('Hull') > -1).toBe(true);
      expect(foundValues.indexOf('Honley') > -1).toBe(true);
      expect(foundValues.indexOf('Harrogate') > -1).toBe(true);
      expect(foundValues.indexOf('Hadfield') > -1).toBe(true);
      expect(foundValues.indexOf('Holmfirth') > -1).toBe(true);
   });

});

describe('startsWithSurrondEm tests', function() {

  it('should match <em>Alm</em>ondbury', function() {

      var valueToFind = "Alm";
      var valueToSurrond = "Almondbury";
      var surrondedValue = autocompleteHelper.startsWithSurrondEm(valueToFind, valueToSurrond);

      expect(surrondedValue).toBe("<em data='Almondbury'>Alm</em>ondbury");

  });

  it('should match <em>Almondbury</em>', function() {

      var valueToFind = "Almondbury";
      var valueToSurrond = "Almondbury";
      var surrondedValue = autocompleteHelper.startsWithSurrondEm(valueToFind, valueToSurrond);

      expect(surrondedValue).toBe("<em data='Almondbury'>Almondbury</em>");

  });

  it('should match <em>lee</em>', function() {

      var valueToFind = "le";
      var valueToSurrond = "lee";
      var surrondedValue = autocompleteHelper.startsWithSurrondEm(valueToFind, valueToSurrond);

      expect(surrondedValue).toBe("<em data='lee'>le</em>e");

  });

  it('should match <em>HALIFAX</em>', function() {

      var valueToFind = "HALIFA";
      var valueToSurrond = "HALIFAX";
      var surrondedValue = autocompleteHelper.startsWithSurrondEm(valueToFind, valueToSurrond);

      expect(surrondedValue).toBe("<em data='HALIFAX'>HALIFA</em>X");

  });

  it('should match <em>HALIFAX</em>', function() {

      var valueToFind = "ha";
      var valueToSurrond = "HALIFAX";
      var surrondedValue = autocompleteHelper.startsWithSurrondEm(valueToFind, valueToSurrond);

      expect(surrondedValue).toBe("<em data='HALIFAX'>HA</em>LIFAX");

  });

});

describe('numberOfKeyStrokesReached tests', function() {

  it('should return false as the length of "Holm" is less than 5', function() {

      var keyedValue = "Holm";
      var minimumNumberOfStrokesReached = 5;
      var minimumReached = autocompleteHelper.numberOfKeyStrokesReached(keyedValue, minimumNumberOfStrokesReached);

      expect(minimumReached).toBe(false);

  });

  it('should return true as the length of "Hol" is equal to 3', function() {

      var keyedValue = "Hol";
      var minimumNumberOfStrokesReached = 3;
      var minimumReached = autocompleteHelper.numberOfKeyStrokesReached(keyedValue, minimumNumberOfStrokesReached);

      expect(minimumReached).toBe(true);

  });

  it('should return true as the length of "Hol" is greater than 2', function() {

      var keyedValue = "Hol";
      var minimumNumberOfStrokesReached = 2;
      var minimumReached = autocompleteHelper.numberOfKeyStrokesReached(keyedValue, minimumNumberOfStrokesReached);

      expect(minimumReached).toBe(true);

  });

  it('should return false as keyedValue is undefined', function() {

      var keyedValue = undefined;
      var minimumNumberOfStrokesReached = 2;
      var minimumReached = autocompleteHelper.numberOfKeyStrokesReached(keyedValue, minimumNumberOfStrokesReached);

      expect(minimumReached).toBe(false);

  });

  it('should return false as minimumNumberOfStrokesReached is undefined', function() {

      var keyedValue = "Hol";
      var minimumNumberOfStrokesReached = undefined;
      var minimumReached = autocompleteHelper.numberOfKeyStrokesReached(keyedValue, minimumNumberOfStrokesReached);

      expect(minimumReached).toBe(false);

  });

  it('should return false as minimumNumberOfStrokesReached is nan', function() {

      var keyedValue = "Hol";
      var minimumNumberOfStrokesReached = "Not a number";
      var minimumReached = autocompleteHelper.numberOfKeyStrokesReached(keyedValue, minimumNumberOfStrokesReached);

      expect(minimumReached).toBe(false);

  });

});

describe('flat list or json object test', function() {

  it('should return "list"', function() {

      var list = ['Leeds', 'Manchester'];
      var type = autocompleteHelper.isListOrObject(list);

      expect(type).toBe('list');

  });

  it('should return "object"', function() {

      var list = {'Leeds':'http://localhost:3000/town/Leeds', 'Manchester':'http://localhost:3000/town/Manchester',
                  'Bradford':'http://localhost:3000/town/Bradford'};
      var type = autocompleteHelper.isListOrObject(list);

      expect(type).toBe('object');

  });

  it('should return "invalid" for anything else', function() {

      var invalidType = 'invalid';
      var value = 7;
      var type = autocompleteHelper.isListOrObject(value);
      expect(type).toBe(invalidType);

      value = 1.5;
      type = autocompleteHelper.isListOrObject(value);
      expect(type).toBe(invalidType);

      value = "Wakefield";
      type = autocompleteHelper.isListOrObject(value);
      expect(type).toBe(invalidType);

      value = false;
      type = autocompleteHelper.isListOrObject(value);
      expect(type).toBe(invalidType);

      value = new Date();
      type = autocompleteHelper.isListOrObject(value);
      expect(type).toBe(invalidType);

  });

});

describe('check array list tests', function() {

  it('should return true as all values are strings', function() {

      var list = ['Leeds', 'Manchester'];
      var allStrings = autocompleteHelper.areAllValuesStrings(list);

      expect(allStrings).toBe(true);

  });

  it('should return false as list contains a number', function() {

      var list = ['Leeds', 2];
      var allStrings = autocompleteHelper.areAllValuesStrings(list);

      expect(allStrings).toBe(false);

  });

  it('should return false as list contains a boolean', function() {

      var list = ['Leeds', 'Manchester', true, 'Huddersfield'];
      var allStrings = autocompleteHelper.areAllValuesStrings(list);

      expect(allStrings).toBe(false);

  });

});

describe('check object tests', function() {

  it('should return true as all keys are strings', function() {

      var list = {'Leeds':'http://localhost:3000/town/Leeds', 'Manchester':'http://localhost:3000/town/Manchester',
                  'Bradford':'http://localhost:3000/town/Bradford'};
      var allStrings = autocompleteHelper.areAllKeysStrings(list);

      expect(allStrings).toBe(true);

  });

  it('should return false as list contains a number key', function() {

      var list = {'Leeds':'http://localhost:3000/town/Leeds', 'Manchester':'http://localhost:3000/town/Manchester',
                  0:'http://localhost:3000/town/Bradford'};
      var allStrings = autocompleteHelper.areAllKeysStrings(list);

      expect(allStrings).toBe(false);

  });

  it('should return false as list contains a boolean key', function() {

      var list = {'Leeds':'http://localhost:3000/town/Leeds', true:'http://localhost:3000/town/Manchester',
                  'Bradford':'http://localhost:3000/town/Bradford'};
      var allStrings = autocompleteHelper.areAllKeysStrings(list);

      expect(allStrings).toBe(false);

  });

});
