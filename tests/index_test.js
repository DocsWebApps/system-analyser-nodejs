var request=require('supertest');
var app=require('./../app');

describe('Test the Home Page', function() {
  it('Check the status code is 200', function(done){
    request(app)
      .get('/')
      .expect(200, done)
  });

  it('Check the #title-section', function(done){
    request(app)
      .get('/')
      .expect(/Check the health of your servers today !/)
      .expect(/System Analyser/, done)
  });

  it('Check the image is present', function(done){
    request(app)
      .get('/')
      .expect(/system-analyser.jpg/, done)
  });
});
