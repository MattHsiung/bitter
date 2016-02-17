var socket = io();
function getTime(){
	var currentTime = new Date()
	var hours = currentTime.getHours()
	var minutes = currentTime.getMinutes()

	if (minutes < 10)
	minutes = "0" + minutes
	return"<b>" + hours + ":" + minutes + " " + "</b>"
}


$('form').submit(function(){
	var userName = ($('#username').val())?  $('#username').val(): 'Anonymous Hater'
	socket.emit('chat message', {
		id:socket.id,
		msg:$('#m').val(),
		user:userName
	});
    $('#m').val('');
    return false;
})


socket.on('data', function(data, id){
	if(id === '/#'+socket.id){
		for (var i = 0; i < data.length; i++) {
			addMessage(data[i])
		}
	}
})


socket.on('userJoin', function(){
	$('#messages').append('<h1> WELCOME NEW HATER</h1>');
    $("#feedBg").animate({
        scrollTop: $("#messages")[0].scrollHeight
    }, 300);

})

var users;

socket.on('users', function(data){
	var html=''
	users=data
	for(var user in users){
		html += '<li class="list-group-item message">'+users[user]+'</li>'
	}
	$('#userList').html(html)
	console.log(html)
})

socket.on('userLeave',function(msg){
	$('#messages').append('<h1> '+msg.msg+'</h1>');
    $("#feedBg").animate({
        scrollTop: $("#messages")[0].scrollHeight
    }, 300);

})

socket.on('chatData', function(data){
	

})

socket.on('chat message', addMessage);

function addMessage (msg){
    $('#messages').append($('<li class="list-group-item message"></li>').append('<a class="avatar"><img style="height:50px"src="http://images2.browardpalmbeach.com/imager/silky-johnson-player-hater-of-the-year/u/original/6423004/pimped_out_chappelle1.jpg"/></a><a><h4>@'+msg.user +'</h4><h5>'+getTime()+'</h5><span>'+convert(msg.msg)+'</span></a>'));
    $("#feedBg").animate({
        scrollTop: $("#messages")[0].scrollHeight
    }, 300);
}

function convert(input) {
  return emojione.shortnameToImage(input);
}