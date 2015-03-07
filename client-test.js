var socket = require('net');

var options = {
  port: 4321,
  host: '127.1.1.1'
};

var socket = socket.connect( options.port, options.host );

socket.write('ROCK');
socket.end();

socket.on( 'data', function( data ) {
  console.log( 'DATA given: ' + data );
});

