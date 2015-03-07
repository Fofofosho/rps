var net = require('net');
var kue = require('kue');
var jobs = kue.createQueue({
  prefix: 'q',
  redis: {
    port: 9999,
    host: '127.1.1.1',
    auth: 'password',
    db: 3
  }
});
console.log('KUE created');


var HOST = '127.1.1.1';
var PORT = 4321;
var GLOBALTXN = 0;

var server = net.createServer().listen( PORT, HOST, function () {
  console.log( 'callback listener');
});


server.on( 'connection', function (socket) {
  //socket connection
  console.log( 'Connection with '+ socket.remoteAddress + ' : ' + socket.remotePort );

  socket.on( 'data', function (data) {
    GLOBALTXN++;
    console.log( 'DATA: ' + data );
    //also add save(txnId, sourceId, targetId, value)
    // VALUE --- 0 rock, 1 paper, 2 scissors
    save(GLOBALTXN);
  });
});




// function save ( sourceId, targetId, val, callback ) {
  
//   var myJob = jobs.create('test', {
//     title: 'my custom test',
//     text: 'my custom test message'
//   });

//   myJob().save( function(err){
//     if( !err ) console.log( job.id );
//   });

// }

function save ( txnId ) {
  
  var myJob = jobs.create(txnId, {
    title: 'my custom test',
    text: 'my custom test message'
  }).save( function(err){
    if( !err ) console.log( job.id );
  });

}
