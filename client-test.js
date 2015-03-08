var net = require('net');

var options = {
  port: 1111,
  host: '127.1.1.1'
};

var socket = net.connect( options.port, options.host );

//Doppl3r played fofo with a rock
// socket.write('doppl3r,fofo,0');
socket.write('fofo,doppl3r,0');

socket.on( 'data', function( data ) {
  console.log( 'CLIENT - DATA given: ' + data );
});

socket.on( 'error', function( err ) {
  console.log( 'CLIENT - ERROR socket: ' + err );
});

