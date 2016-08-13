angular.module('pokeApp.routes',['ngRoute'])

.config(function($routeProvider, $locationProvider){
  $routeProvider
  // .when('/',{})
  .when('/',{
    templateUrl : 'views/pages/login.html',
    controller : 'loginCtrl',
    controllerAs : 'login'
  })

  .when('/login',{
    templateUrl : 'views/pages/login.html',
    controller : 'loginCtrl',
    controllerAs : 'login'
  })


  .when('/users',{
    templateUrl : 'views/pages/user.html',
    controller : 'userCtrl',
    controllerAs : 'user'
  })

  .when('/pokemons',{
    templateUrl : 'views/pages/pokemon.html',
    controller : 'pokemonCtrl',
    controllerAs : 'pokemon'
  })


.otherwise({
  redirectTo:'/'
})


  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
})
.constant('GlobalInfo',
       {
          //  apiUrl: 'http://localhost:5000/api'
           //apiUrl:http://curso-mean-henry.herokuapp.com/
           apiUrl: 'https://mean-cal.herokuapp.com'
       });
