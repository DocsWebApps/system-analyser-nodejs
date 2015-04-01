function MetricsDAO(db) {
/* If this constructor is called without the "new" operator, "this" points
   * to the global object. Log a warning and call it correctly. */
  if(false === this instanceof MetricsDAO) {
    return new MetricsDAO(db);
  }
  // Specify the collection for this model
  var metrics=db.collection("metrics");
  // Model methods
  // Return a list of servers
  this.fetchServerList=function(callback) {
    metrics.distinct("server", function(err,doc) {
      return callback(doc);
    });
  },

  this.fetchDateList=function(server,callback) {
    metrics.distinct("date",{"server":server}, function(err,doc) {
      return callback(doc);
    });
  }


}

module.exports.MetricsDAO=MetricsDAO;