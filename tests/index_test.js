var request=require('supertest');
var app=require('./../app');

describe('Test the functions of the Home Page', function() {
  it('adds the date select when a server is chosen', function(done) {
    done();
  });
});

describe('Test the content of the Home Page', function() {
  it('returns a status code is 200', function(done){
    request(app)
      .get('/')
      .expect(200, done)
  });

  it('has a content-type of text/html', function(done){
    request(app)
      .get('/')
      .expect('Content-Type', /text\/html/, done)
  });

  it('has a #title section', function(done){
    request(app)
      .get('/')
      .expect(/id="title"/)
      .expect(/id="title-text"/)
      .expect(/System Analyser/)
      .expect(/id="lead-text"/)
      .expect(/Check the health of your servers today !/, done)
  });

  it('has an image in the #image section', function(done){
    request(app)
      .get('/')
      .expect(/id="image"/)
      .expect(/system-analyser.jpg/, done)
  });

  it('has a #server-metrics  section', function(done){
    request(app)
      .get('/')
      .expect(/id="server-metrics"/)
      .expect(/Please select a server/, done)
      .expect(/id="server-select"/)
      .expect(/id="server-date"/)
      .expect(/id="date-select"/)
  });

  it('has a #how-to  section', function(done){
    request(app)
      .get('/')
      .expect(/id="how-to"/, done)
  });

  it('has a #contacts  section', function(done){
    request(app)
      .get('/')
      .expect(/id="contacts"/, done)
  });
});