
module.exports = function(io){

	var connectedUserNumber = 0;
	console.log('sockets.js');
	//Socket events
	io.on('connection', (socket) => {
		//console.log('socket connection');
		connectedUserNumber++;
		socket.emit('nb_total_user', connectedUserNumber);
			
		socket.on('player_added', (data) => {
			console.log('event player added');
			socket.broadcast.emit('player_added_message', data);
		});

		socket.on('disconnect', () => {
			connectedUserNumber--;
			socket.emit('nb_total_user', connectedUserNumber);
		});

	});
}
