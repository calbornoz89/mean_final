angular.module('pokeApp',[
  'pokeApp.routes',
  'pokeApp.mainCtrl',
  'pokeApp.loginCtrl',
  'pokeApp.pokemonCtrl',
  'pokeApp.userCtrl',
  'pokeApp.authServices',
  'pokeApp.pokemonServices',
  'pokeApp.userServices',
  'lumx'
])
.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');

})
