var request = require('supertest')
  , app     = require('../app.js').app
  , assert  = require("assert");

describe('GET tests', function(){
  it('Can we run GET requests?', function(done){
    request(app)
        .get('/')
        .expect(300)
        .end(function(err, res){
            done();
        })
  })
});
