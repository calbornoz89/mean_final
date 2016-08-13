angular.module('pokeApp.mainCtrl',[])

.controller('mainCtrl', function($location, authServices, $rootScope) {
     var vm = this;

    vm.loggedIn = authServices.isLoggedIn();

    vm.logout = function(){
       authServices.logout();
    }

    //vm.logout = authServices.logout();

    $rootScope.$on('$routeChangeStart', function(){

      vm.loggedIn = authServices.isLoggedIn();
      console.log('cambia', vm.loggedIn)


    })

     vm.goTo = function(route){
       $location.path(route)
     }
   })
