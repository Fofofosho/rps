// var array = [];

// var info1 = {
//   info: 'abc',
//   ip: '213.123',
//   pass: 'pass'
// }

// var info2 = {
//   info: 'bbb',
//   ip: '123',
//   pass: 'pass'
// }

// array.push(info1);
// array.push(info2);

// var eventObj = {
//   sourceStr: 'abc'
// }

// console.log(array[0]);

// var connectInfo1 = '';

// array.forEach( function(elem, index, array){
//   if (eventObj.sourceStr == elem.info)
//   {
//     console.log('found a match');
//     connectInfo1 = elem;
//   }
// });

// console.log( connectInfo1 );

var async = require( 'async' );

var myArr = [];

var queue = async.queue( function (task, callback) {
  console.log(task);
  myArr.push(task);
  console.log(myArr.length);

  callback();
});

queue.push( {source: 'source',
            target: 'target',
            action: 'action'}
          , function (err) {
            if(err) 
              console.log('PUSH ERR: '+ err);
            else 
            {
              console.log( 'PROCESSED PUSH of eventObj' );
            }

    });