angular.module('pokeApp.loginCtrl',[])

.controller('loginCtrl', function($http, authServices){
  var vm = this;
  vm.message = 'Este es el login';


vm.login = function(username,password) {
  authServices.login(username,password);
  }




// vm => viewModel
//   vm.getPokemons = function(){
//     $http
//     // obtener la DB
//     .get("bd_pokemon/pokemons.json")
//
//
//     .then(function(response){
//
// pokemonServices.setPokemons(response.data)
//
//       // console.log(response.data[0])
//
//     })
//   }
//
// vm.getPokemons();


})
