function ServersDAO(db) {
  /* If this constructor is called without the "new" operator, "this" points
   * to the global object. Log a warning and call it correctly. */
  if (false === (this instanceof ServersDAO)) {
      return new ServersDAO(db);
  }

  // Specify the collection for this model
  var servers=db.collection("servers");

  // Model methods

  // Return a list of all servers
  this.fetchServerList=function(callback) {
    var serverArray=[];
    var cursor=servers.find({},{"_id":true});

    cursor.each(function(err, doc) {
        if(err) throw err;

        if(doc == null) {
            return callback(serverArray);;
        } else {
          serverArray.push(doc._id);
        }
    });
  },

  // For a particular server, find all the dates that the server has metrics for
  this.fetchDateList=function(server,callback) {
    servers.findOne({"_id": server},{"_id":false,"dates":true}, function(err, doc) {
      return callback(doc.dates);
    }); 
  }
}

// Export as a module so that can be used like a class ie. new ServerDAO()
module.exports.ServersDAO=ServersDAO;