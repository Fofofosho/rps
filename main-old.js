var net = require('net');
var async = require('async');
var senderInfo = {
  userName: '',
  userIP: '',
  userPort: ''
};

var eventObjTable = [];
var db = [];
var eventObj = '';

var HOST = '127.1.1.1';
var PORT1 = 1111;
var PORT2 = 2222;
var PORT3 = 3333;
var PORT4 = 4444;

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
    console.log( 'DATA: ' + data );
    var splitData = String(data).split(',');
    eventObj = {
      sourceStr: splitData[0],
      targetStr: splitData[1],
      actionVal: Number(splitData[2])
    }

    senderInfo.userName = splitData[0];
    //also add save(txnId, sourceId, targetId, value)
    // VALUE --- 0 rock, 1 paper, 2 scissors
    db.push( senderInfo );
    queue.push( 
      {source: eventObj.sourceStr,
      target: eventObj.targetStr,
      action: eventObj.actionVal}, function (err) {
        if(err) 
          console.log('PUSH ERR: '+ err);
        else 
        {
          console.log( 'PROCESSED PUSH of eventObj: ' + eventObj );
        }
    });

  }); //socket on data end

  socket.on( 'error', function (err) {
    console.log( 'SOCKET ERROR: ' + err );
  });

  socket.on( 'drain', function() {
    console.log( 'SOCKET DRAINED' );
  });

}); // server 1 on connection

var queue = async.queue(function (task, callback) {
    console.log('DEBUG task: ' + task);
    eventObjTable.push(task);

    //Figure out if the targetStr matches a sourceStr of this entry
    // for (var entry in eventObjTable.get(eventObj.targetStr))
    eventObjTable.forEach( function(elem, index, arr) {
      console.log( 'elem - ' + elem );
      console.log( 'eventObj target - ' + eventObj.targetStr );
      //Check to see if it exists in the eventObjTable
      if ( eventObj.targetStr == elem.target )
      {
        console.log( 'DEBUG for each elem: ' + elem.source );
        console.log( 'DEBUG for each hashtable: ' + eventObj.targetStr );
        //If we already have their request to ME, then go to logic
        if ( elem.source == eventObj.sourceStr )
        {
          //then we have a match
          //figure out who wins
          var rc = solveWinner( eventObj.actionVal, elem.action );
          console.log( 'DEBUG rc from winner: ' + rc );
          communicate(rc, eventObj);
          
          //delete entry in hash table ?

        }
      }
      else
      {
        console.log( 'DEBUG target string is not there: ' + eventObj.targetStr );
      }
    });

  callback();

});

queue.drain = function () {
  console.log( 'all items have been processed' );
}

var solveWinner = function ( person1, person2 ) {
  console.log( 'DEBUG solveWinner' );
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
  console.log( 'DEBUG communicate' );

  var connectInfo1 = '';
  var connectInfo2 = '';

  db.forEach( function(elem, index, arr) {
    if (eventObj.sourceStr == elem.userName)
    {
      connectInfo1 = elem;
    }
  });
  db.forEach( function(elem, index, arr) {
    if (eventObj.targetStr == elem.userName)
    {
      connectInfo2 = elem;
    }
  });

  //Send results to player 1 and player 2
  switch ( rc )
  {
    case (-1):
      console.log( 'DEBUG player 1 won' );
      console.log( 'port and ip -- ' + connectInfo1.userPort + '--'
                   + connectInfo1.userIP );

      net.connect(connectInfo1.userPort, connectInfo1.userIP).write('1');
      net.connect(connectInfo1.userPort, connectInfo1.userIP).end();

      net.connect(connectInfo2.userPort, connectInfo1.userIP).write('-1');
      net.connect(connectInfo2.userPort, connectInfo1.userIP).end();
      break;
    case 0:
      console.log( 'DEBUG players tied' );
      net.connect(connectInfo1.userPort, connectInfo1.userIP).write('0');
      net.connect(connectInfo1.userPort, connectInfo1.userIP).end();

      net.connect(connectInfo2.userPort, connectInfo1.userIP).write('0');
      net.connect(connectInfo2.userPort, connectInfo1.userIP).end();
      break;
    case 1:
      console.log( 'DEBUG player 2 won' );
      net.connect(connectInfo1.userPort, connectInfo1.userIP).write('-1');
      net.connect(connectInfo1.userPort, connectInfo1.userIP).end();

      net.connect(connectInfo2.userPort, connectInfo1.userIP).write('1');
      net.connect(connectInfo2.userPort, connectInfo1.userIP).end();
      break;
  }
  
}
