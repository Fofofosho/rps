// var redis = require('redis');
// var client = redis.createClient(9999, '127.1.1.1');

// client.on( 'error', function (err) {
//   console.log( 'ERROR REDIS: ' + err);
// });

// client.set("string key", "string val", redis.print);
// client.hset("hash key", "hashtest 1", "some value", redis.print);
// client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
// client.hkeys("hash key", function (err, replies) {
//     console.log(replies.length + " replies:");
//     replies.forEach(function (reply, i) {
//         console.log("    " + i + ": " + reply);
//     });
//     client.quit();
// });

var kue = require('kue');
var jobs = kue.createQueue();
console.log('KUE created');

// function save ( sourceId, targetId, val, callback ) {
  
//   var myJob = jobs.create('test', {
//     title: 'my custom test',
//     text: 'my custom test message'
//   });

//   myJob().save( function(err){
//     if( !err ) console.log( job.id );
//   });

// }

function save () {
  
  var myJob = jobs.create('test', {
    title: 'my custom test',
    text: 'my custom test message'
  });

  myJob().save( function(err){
    if( !err ) console.log( job.id );
  });

}