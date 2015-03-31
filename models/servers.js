function ServersDAO(db) {
  /* If this constructor is called without the "new" operator, "this" points
   * to the global object. Log a warning and call it correctly. */
  if (false === (this instanceof ServersDAO)) {
      console.log('Warning: ServersDAO constructor called without "new" operator');
      return new ServersDAO(db);
  }

  var servers=db.collection("servers");

  this.getServers=function(callback) {
    var serverArray=[];
    var cursor=servers.find({},{"_id":false,"name":true});

    cursor.each(function(err, doc) {
        if(err) throw err;

        if(doc == null) {
            return callback(serverArray);;
        } else {
          serverArray.push(doc.name);
        }
    });
  },
  this.getDates=function(server,callback) {
    servers.findOne({"name": server},{"_id":false,"dates":true}, function(err, dateObj) {
      return callback(dateObj.dates);
    }); 
  }
}

module.exports.ServersDAO=ServersDAO;