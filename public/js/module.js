'use strict';

var app = angular.module('app', ['ui.router', 'firebase']);

//------AUTH----------
app.factory('Auth', function ($firebaseAuth) {
	var ref = new Firebase('https://amber-heat-5894.firebaseio.com/')  
	return $firebaseAuth(ref)
})

app.controller('AuthCtrl', function ($scope, Auth, User) {
	$scope.profile = {}
    Auth.$onAuth(function(authData) {
      	User.userName = $scope.profile.userName
      $scope.authData = authData;
      console.log(authData)
    });

	$scope.login = function() {
    	Auth.$authAnonymously()
    	.catch(function(error) {
    		$scope.error = error;
    	});
  	}

  	$scope.logout = function(){
  		Auth.$unauth();
  	}
});

//------USER----------
app.factory('User', function () {
	return {
		userName: 'Enter User Name'
	};
})


//------CHAT----------

app.controller('ChatCtrl', function ($scope, ChatF, User) {
	$scope.getTime = function (){
		var currentTime = new Date()
		var hours = currentTime.getHours()
		var minutes = currentTime.getMinutes()
		if (minutes < 10)
		minutes = "0" + minutes
		return"<b>" + hours + ":" + minutes + " " + "</b>"
	}

	

	$scope.newMessage = function(){
		console.log(User)
	   	ChatF.ref.push({
	   		time:$scope.getTime(),
			msg:$('#m').val(),
			user:User.userName
		})
	}
	ChatF.ref.limitToLast(10).on('child_added', ChatF.addMessage);
})

app.factory('ChatF', function (User) {
	var ref = new Firebase('https://amber-heat-5894.firebaseio.com/')  
	var convert = function (input) {
		return emojione.shortnameToImage(input);
	}
	return {
		addMessage: function (snapshot){
			var msg= snapshot.val();

		    $('#messages').append($('<li class="list-group-item message"></li>').append('<a class="avatar"><img style="height:50px"src="http://images2.browardpalmbeach.com/imager/silky-johnson-player-hater-of-the-year/u/original/6423004/pimped_out_chappelle1.jpg"/></a><a><h4>@'+msg.user +'</h4><h5>'+msg.time+'</h5><span>'+convert(msg.msg)+'</span></a>'));
		    $("#feedBg").animate({
		        scrollTop: $("#messages")[0].scrollHeight
		    }, 300);
		},
		ref: ref
	}
})
