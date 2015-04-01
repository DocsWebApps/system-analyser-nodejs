function MetricsDAO(db) {
/* If this constructor is called without the "new" operator, "this" points
   * to the global object. Log a warning and call it correctly. */
  if(false === this instanceof MetricsDAO) {
    return new MetricsDAO(db);
  }
  // Specify the collection for this model
  var metrics=db.collection("metrics");
  // Model methods
  // Return a distinct list of servers
  this.fetchServerList=function(callback) {
    metrics.distinct("server", function(err,doc) {
      return callback(doc);
    });
  },
  // Return a list of distinct dates for a server
  this.fetchDateList=function(server,callback) {
    metrics.distinct("date",{"server":server}, function(err,doc) {
      return callback(doc);
    });
  },
  // Return the server metrics for a server/date(via key) combo
  this.fetchServerMetrics=function(key,callback) {
    metrics.findOne({"_id":key}, function(err,doc) {
      return callback(doc.server_metrics);
    });
  }
}
// Export as a module
module.exports.MetricsDAO=MetricsDAO;