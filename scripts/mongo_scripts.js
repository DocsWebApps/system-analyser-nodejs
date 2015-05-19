use sysan_dev

var cursor=db.metrics.find();
var doc=null;

while (cursor.hasNext()) {
  doc=cursor.next();
  //print(JSON.stringify(doc._id)+' '+JSON.stringify(doc.server)+' '+JSON.stringify(doc.date));
  print(JSON.stringify(doc.server_metrics.cpu));
}