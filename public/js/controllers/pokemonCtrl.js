angular.module('pokeApp.pokemonCtrl',[])

.controller('pokemonCtrl', function(pokemonServices, LxDialogService, LxNotificationService){
  var vm = this;

  vm.dialogId = 'dialog-test';
          vm.dialogIdEdit = 'dialog-edit';

          vm.infoUser = {};
          vm.model = {};
          vm.add = function() {
              vm.model = {};
              LxDialogService.open(vm.dialogIdEdit);

          }

          vm.add = function() {
                      vm.model = {};
                      LxDialogService.open(vm.dialogIdEdit);

                  };

                  vm.edit = function(id) {

                      pokemonServices.get(id).then(
                          function(response) {
                              vm.model = response;
                              LxDialogService.open(vm.dialogIdEdit);
                          },
                          function(response) {

                          });
                  };

                  var getPokemons = function() {

                      pokemonServices.all().then(
                          function(response) {
                              vm.pokemons = response;
                          },
                          function(response) {

                          });
                  };

                  vm.search = function() {

                      pokemonServices.search(vm.searchPokemon).then(
                          function(response) {
                              vm.pokemons = response;
                          },
                          function(response) {

                          });
                  };

                  vm.save = function(model) {

                      if (!model._id) {
                          pokemonServices.create(model).then(
                              function(response) {
                                  LxDialogService.close(vm.dialogIdEdit);
                                  getPokemons();
                              },
                              function(response) {

                              });
                      } else {

                          pokemonServices.update(model).then(
                              function(response) {
                                  LxDialogService.close(vm.dialogIdEdit);
                                  getPokemons();
                              },
                              function(response) {

                              });
                      }
                  };

                  vm.openDialog = function(infoPokemon) {
                      vm.infoPokemon = infoPokemon;
                      LxDialogService.open(vm.dialogId);
                  };

                  vm.delete = function(id) {

                      pokemonServices.delete(id).then(
                          function(response) {
                              getPokemons();
                          },
                          function(response) {

                          });
                  };
                  getPokemons();


  // pokemonServices.getPokemons().then(function(response){
  //         vm.pokemons = response;
  //
  //       })


})
