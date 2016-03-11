// __tests__/autocomplete-helper-test.js
jest.autoMockOff();
jest.dontMock('../autocomplete-helper');

var autocompleteHelper = require('../autocomplete-helper');

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
   expect(autocompleteHelper.replaceAll("Hud", "Huddersfield")).toBe("<em>Hud</em>dersfield");
 });

 it('should find Hud in Huddersfield - case sensitive', function() {
   expect(autocompleteHelper.replaceAll("Hud", "Huddersfield", true)).toBe("<em>Hud</em>dersfield");
 });

 it('should not find Hud in Huddersfield - case sensitive', function() {
   expect(autocompleteHelper.replaceAll("hud", "Huddersfield", true)).toBe("Huddersfield");
 });

 it('should find field in Huddersfield - case sensitive', function() {
   expect(autocompleteHelper.replaceAll("field", "Huddersfield", true)).toBe("Hudders<em>field</em>");
 });

 it('should find field in Huddersfield - case insensitive', function() {
   expect(autocompleteHelper.replaceAll("field", "Huddersfield")).toBe("Hudders<em>field</em>");
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

  it('should match <em>Alm</em>ondbury</span>', function() {

      var valueToFind = "Alm";
      var valueToSurrond = "Almondbury";
      var surrondedValue = autocompleteHelper.startsWithSurrondEm(valueToFind, valueToSurrond);

      expect(surrondedValue).toBe("<em>Alm</em>ondbury</span>");

  });

  it('should match <em>Almondbury</em></span>', function() {

      var valueToFind = "Almondbury";
      var valueToSurrond = "Almondbury";
      var surrondedValue = autocompleteHelper.startsWithSurrondEm(valueToFind, valueToSurrond);

      expect(surrondedValue).toBe("<em>Almondbury</em></span>");

  });

  it('should match <em>lee</em></span>', function() {

      var valueToFind = "le";
      var valueToSurrond = "lee";
      var surrondedValue = autocompleteHelper.startsWithSurrondEm(valueToFind, valueToSurrond);

      expect(surrondedValue).toBe("<em>le</em>e</span>");

  });

  it('should match <em>HALIFAX</em></span>', function() {

      var valueToFind = "HALIFA";
      var valueToSurrond = "HALIFAX";
      var surrondedValue = autocompleteHelper.startsWithSurrondEm(valueToFind, valueToSurrond);

      expect(surrondedValue).toBe("<em>HALIFA</em>X</span>");

  });

});
