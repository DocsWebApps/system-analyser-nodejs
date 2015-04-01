var MetricsDAO=require('../models/metrics').MetricsDAO;

function ContentHandler (db) {
  // Define which models the controller requires
  var metrics=new MetricsDAO(db);
  // Return homepage
  this.displayHomePage=function(req, res, next) {
    return res.render('index', { title: 'System Analyser' });
  },
  // Return server list - AJAX
  this.fetchServerList=function(req, res, next) {
    metrics.fetchServerList(function(serverArray) {
      return res.status(200).json(serverArray);
    });
  },
  // Return date list per server - AJAX
  this.fetchDateList=function(req, res, next) {
    var server=req.params.server;
    metrics.fetchDateList(server,function(datesArray) {
      return res.status(200).json(datesArray);
    });
  },
  // Return server metric page
  this.fetchServerMetrics=function(req, res, next) {
    var server=req.params.server;
    var date=req.params.date;
    var key=server+"-"+date;
    
    metrics.fetchServerMetrics(key,function(metricsArray) {
      return res.render('server_metrics',  
                { server: server, 
                  date: date, 
                  cpuMetrics: JSON.stringify(metricsArray[0].cpu),
                  memMetrics: JSON.stringify(metricsArray[1].mem),
                  diskMetrics: JSON.stringify(metricsArray[2].disk),
                  netInMetrics: JSON.stringify(metricsArray[3].netIn),
                  netOutMetrics: JSON.stringify(metricsArray[4].netOut)
                });
    }); 
  }
}
// Export module
module.exports = ContentHandler;