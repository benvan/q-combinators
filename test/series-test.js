var Q = require('q');
var sinon = require('sinon');
var series = require('../').series;

require('should');

describe('series', function(){
    var inc = function(a){ return a + 1 };
    var promise1 = function(){ return Q(1) };
    var reject1 = function(){ return Q.reject(1) };

    it('be the equivalent of a promise chain', function(done){
        series([promise1, inc, inc, inc, inc])
            .then(function(val){ 
                val.should.eql(5);
            })
            .then(done, done);
    });

    it('should handle failure the same way as a promise chain', function(done){
        series([reject1, inc, inc, inc, inc])
            .fail(function(val){ 
                val.should.eql(1);
            })
            .then(done, done);
    });
});