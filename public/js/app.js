// var socket = io(window.location.origin);

// socket.on('connect', function () {
//     console.log('I have made a persistent two-way connection to the server!');

// });

// socket.on('display', function(args){
// 	var start = args[0];
// 	var end =args[1];
// 	var strokeColor = args[2];
	
// 	whiteboard.draw(start, end, strokeColor,false)
// });

// whiteboard.on('draw', function(){
// 	var args=[].slice.call(arguments)
// 	socket.emit('drawing', args);
// })