"user strict";

var fs=require('fs'),
    inputParams=process.argv,
    inFile=null,
    outFile=null,
    lineReader = require('line-reader'),
    lineArray=null,
    server=null,
    firstRecord=true;

if(inputParams.length<3) {
  console.log("Need to enter the inFile as a parameter!");
  process.exit();
} else {
  inFile=inputParams[2];
  outFile='metrics1.json';
}

// Check the file exists - use fs-extra !

server=inFile.split('_')[0].split('/')[2];

var startDate=null,
    cpu=[],
    mem=[],
    disk=[],
    netIn=[],
    netOut=[],
    key=null,
    recs=[];

lineReader.eachLine(inFile, function(line, last) {
  lineArray=line.split(',');

  if (firstRecord) {
    startDate=lineArray[0];
    firstRecord=false;
  };

  if (startDate===lineArray[0]) {
    millSecs=new Date(startDate+' '+lineArray[1]).getTime();
    cpu.push([millSecs,Number(lineArray[2])]);
    mem.push([millSecs,Number(lineArray[4])]);
    disk.push([millSecs,Number(lineArray[3])]);
    netIn.push([millSecs,Number(lineArray[5])]);
    netOut.push([millSecs,Number(lineArray[6])]);
  } else {
    key=server+'-'+startDate.replace(/\//g,'');
    recs.push('{"_id":"'+key+'","server":"'+server+'","date":"'+startDate.replace(/\//g,'')+'","server_metrics":[{"cpu":'+JSON.stringify(cpu)+'},{"mem":'+JSON.stringify(mem)+'},{"disk":'+JSON.stringify(disk)+'},{"netIn":'+JSON.stringify(netIn)+'},{"netOut":'+ JSON.stringify(netOut)+'}]}');
    millSecs=new Date(lineArray[0]+' '+lineArray[1]).getTime();
    cpu=[[millSecs,Number(lineArray[2])]];
    mem=[[millSecs,Number(lineArray[4])]];
    disk=[[millSecs,Number(lineArray[3])]];
    netIn=[[millSecs,Number(lineArray[5])]];
    netOut=[[millSecs,Number(lineArray[6])]];
    firstRecord=true;
  };

  if (last) {
    key=server+'-'+startDate.replace(/\//g,'');
    //recs.push({"_id":key,"server":server,"date":startDate.replace(/\//g,''),"server_metrics":[JSON.stringify({"cpu": cpu}),JSON.stringify({"mem": mem}),JSON.stringify({"disk": disk}),JSON.stringify({"netIn": netIn}),JSON.stringify({"netOut": netOut})]});
    recs.push('{"_id":"'+key+'","server":"'+server+'","date":"'+startDate.replace(/\//g,'')+'","server_metrics":[{"cpu":'+JSON.stringify(cpu)+'},{"mem":'+JSON.stringify(mem)+'},{"disk":'+JSON.stringify(disk)+'},{"netIn":'+JSON.stringify(netIn)+'},{"netOut":'+ JSON.stringify(netOut)+'}]}');
    recs.forEach(function(val,len,array) {
      console.log(val);
    });
    return false;
  };
});

