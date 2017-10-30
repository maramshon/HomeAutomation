/ var chai = require('chai');
// var mysql = require('mysql');

//npm install mocha require chai --save-dev
//npm install -g mocha
//

var request = require('request');
var expect = require('chai').expect;

describe('server', function() {
 it('should respond to GET requests for /classes/messages with a 200 status code', function(done) {
   request('http://127.0.0.1:8000/signup', function(error, response, body) {
     expect(response.statusCode).to.equal(200);
     done();
   });
 });
});