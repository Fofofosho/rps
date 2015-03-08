var net = require('net');
var Hashtable = require('hashtable');
// var queue = require('./fancyQueue.js');
var async = require('async');
var senderInfo = {
  userName: '',
  userIP: '',
  userPort: ''
};

var eventObjTable = new Hashtable();
var dbHash = new Hashtable();

var HOST = '127.1.1.1';
var PORT1 = 1111;
var PORT2 = 2222;
var PORT3 = 3333;
var PORT4 = 4444;
var GLOBALTXN = 0;

var server1 = net.createServer().listen( PORT1, HOST, function () {
  console.log( 'callback listener on port: ' + PORT1 );
});

var server2 = net.createServer().listen( PORT2, HOST, function () {
  console.log( 'callback listener on port: ' + PORT2 );
});


server1.on( 'connection', function (socket) {
  //socket connection
  console.log( 'Connection with '+ socket.remoteAddress + ' : ' + socket.remotePort );

  //update userInfo with socket info
  senderInfo.userIP = socket.remoteAddress;
  senderInfo.userPort = socket.remotePort;

  socket.on( 'data', function (data) {
    GLOBALTXN++;
    console.log( 'DATA: ' + data );
    var splitData = String(data).split(',');
    var eventObj = {
      sourceStr: splitData[0],
      targetStr: splitData[1],
      actionVal: Number(splitData[2])
    }

    senderInfo.userName = splitData[0];
    //also add save(txnId, sourceId, targetId, value)
    // VALUE --- 0 rock, 1 paper, 2 scissors
    dbHash.put( senderInfo.userName, senderInfo );
    queue.push( {txnId: GLOBALTXN}, function (err) {
                  if(err) 
                    console.log('PUSH ERR: '+ err);
                  else 
                  {
                    console.log( 'PROCESSED PUSH of eventObj: ' + eventObj );
                    //Instead of DB insert, save to array
                    eventObjTable.put( eventObj.targetStr, 
                      {source: eventObj.sourceStr,
                      target: eventObj.targetStr,
                      action: eventObj.actionVal});
                  }

                });
  });
});

var queue = async.queue(function (task, callback) {
  console.log( 'hello ' + task );

  //Check to see if it exists in the eventObjTable
  if ( eventObjTable.has(eventObj.targetStr) )
  {
    //Figure out if the targetStr matches a sourceStr of this entry
    for (var entry in eventObjTable.get(eventObj.targetStr))
    {
      //If we already have their request to ME, then go to logic
      if ( entry.sourceStr == eventObj.sourceStr )
      {
        //then we have a match
        //figure out who wins
        var rc = solveWinner( eventObj.actionVal, entry.actionVal );
        communicate(rc, eventObj);
        //delete entry in hash table

      }
    }
  }

  callback();

}, 2);

queue.drain = function () {
  console.log( 'all items have been processed' );
}

var solveWinner = function ( person1, person2 ) {
  switch( person1 )
  {
    //ROCK
    case 0:
      if ( person2 === 0 )
      {
        //tie
        return 0;
      }
      if ( person2 === 1 )
      {
        //person1 wins
        return (-1);
      }
      if ( person2 === 2 )
      {
        //person2 wins
        return 1;
      }

      break;
    //SCISSORS
    case 1:
      if ( person2 === 0 )
      {
        //person1 wins
        return (-1);
      }
      if ( person2 === 1 )
      {
        //tie
        return 0;
      }
      if ( person2 === 2 )
      {
        //person2 wins
        return 1;
      }

      break;
    //PAPER
    case 2:
      if ( person2 === 0 )
      {
        //person2 wins
        return 1;
      }
      if ( person2 === 1 )
      {
        //person1 wins
        return (-1);
      }
      if ( person2 === 2 )
      {
        //tie
        return 0;
      }

      break;
  }
}

var communicate = function ( rc, eventObj ) {
  var connectInfo1 = dbHash.get( eventObj.sourceStr );
  var connectInfo2 = dbHash.get( eventObj.targetStr );

  //Send results to player 1 and player 2
  switch ( rc )
  {
    case (-1):
      net.connect(connectInfo1.userPort, connectInfo1.userIP).write('1');
      net.connect(connectInfo1.userPort, connectInfo1.userIP).end();

      net.connect(connectInfo2.userPort, connectInfo1.userIP).write('-1');
      net.connect(connectInfo2.userPort, connectInfo1.userIP).end();
      break;
    case 0:
      net.connect(connectInfo1.userPort, connectInfo1.userIP).write('0');
      net.connect(connectInfo1.userPort, connectInfo1.userIP).end();

      net.connect(connectInfo2.userPort, connectInfo1.userIP).write('0');
      net.connect(connectInfo2.userPort, connectInfo1.userIP).end();
      break;
    case 1:
      net.connect(connectInfo1.userPort, connectInfo1.userIP).write('-1');
      net.connect(connectInfo1.userPort, connectInfo1.userIP).end();

      net.connect(connectInfo2.userPort, connectInfo1.userIP).write('1');
      net.connect(connectInfo2.userPort, connectInfo1.userIP).end();
      break;
  }
  
}
