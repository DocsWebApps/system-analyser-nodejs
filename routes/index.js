var ContentHandler = require('../controllers/content');

module.exports = exports = function(app, db) {
  var contentHandler = new ContentHandler(db);

  // Application Routes
  app.get('/', contentHandler.displayHomePage);
  app.get('/servers', contentHandler.fetchServerList);
  app.get('/servers/:server', contentHandler.fetchDateList);
  app.get('/servers/:server/:date', contentHandler.fetchServerMetrics);

   // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('404 - Not Found, Bubba!');
    err.status = 404;
    next(err);
  });

  // error handlers
  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}