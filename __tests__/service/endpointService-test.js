var should = require('chai').should();
var config = require('../config/config');
var endpointService = require('../../source/service/endpointService');
var isJSON = require('is-json');

describe('endPointService', () => {

    it('should return json', () => {
        var queryString = "api/city/findAllStartsWith/Hu/1";
        var response = endpointService.getData(queryString);

        if(!isJSON.strict(response)){
            true.should.not.equal(true);
        }
    });

});
