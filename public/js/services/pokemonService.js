angular.module('pokeApp.pokemonServices',[])

.service('pokemonServices', function($http, $q, $filter,GlobalInfo){

  var _pokemons = undefined;

          this.all = function() {

                var deferred = $q.defer();

                //$http.get("bd_pokemon/pokemons.json")
                  $http.get(GlobalInfo.apiUrl+"/pokemons")
                    .success(function(response) {
                        deferred.resolve(response);
                    })
                    .error(function(response) {
                        deferred.reject(response);
                    });

                _pokemons = deferred.promise;

              return _pokemons;
          };

          this.search = function(namePokemon) {

              var deferred = $q.defer();

              var found = $filter('filter')(_pokemons.$$state.value, {
                  name: namePokemon
              }, false);
              deferred.resolve(found);
              return deferred.promise;
          };

          this.get = function(id) {

              var deferred = $q.defer();

              $http.get(GlobalInfo.apiUrl+"/pokemons/" + id)
                  .success(function(response) {
                      deferred.resolve(response);
                  })
                  .error(function(response) {
                      deferred.reject(response);
                  });

              return deferred.promise;

          };

          this.create = function(model) {
              var deferred = $q.defer();

              $http.post(GlobalInfo.apiUrl+"/pokemons/", model)
                  .success(function(response) {
                      deferred.resolve(response);
                  })
                  .error(function(response) {
                      deferred.reject(response);
                  });

              return deferred.promise;
          };

          this.update = function(model) {
            var deferred = $q.defer();

            $http.put(GlobalInfo.apiUrl+"/pokemons/"+model._id, model)
                .success(function(response) {
                    deferred.resolve(response);
                })
                .error(function(response) {
                    deferred.reject(response);
                });

            return deferred.promise;
          };

          this.delete = function(id) {
            var deferred = $q.defer();

            $http.delete(GlobalInfo.apiUrl+"/pokemons/" + id)
                .success(function(response) {
                    deferred.resolve(response);
                })
                .error(function(response) {
                    deferred.reject(response);
                });

            return deferred.promise;
          };


})
