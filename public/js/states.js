app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    // define a something state
	// var url = $location.url()
    $urlRouterProvider.when('', '/home')

    $stateProvider.state('home', {
        templateUrl: 'chat.html',
        url: '/home',
        controller:'MainCtrl'
    });
    $stateProvider.state('friends', {
        templateUrl: 'friends.html',
        url: '/haters',
        controller:'MainCtrl'
    
    });
    

    // $locationProvider.html5Mode(true);

});  