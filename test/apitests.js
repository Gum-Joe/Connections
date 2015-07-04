var request = require('supertest')
  , app     = require('../app.js').app
  , assert  = require("assert");

describe('GET and POST tests', function(){
  it('Can we run GET requests?', function(done){
    request(app)
        .get('http://localhost:8080/')
        .expect(300)
        .address("http://localhost:8080")
        .end(function(err, res){
            done();
        })
  })
});
