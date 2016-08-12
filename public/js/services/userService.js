angular.module('pokeApp.userServices',[])

.service('User', function($http, $q, $filter, GlobalInfo){

var _users = undefined;
var _user = undefined;

  this.all = function(){
    if (!_users) {
        var deferred = $q.defer();

        $http.get("/api/users/")
            .success(function(response) {
                deferred.resolve(response);
            })
            .error(function(response) {
                deferred.reject(response);
            });
        _users = deferred.promise
    }
    return _users;
  }


  // GET
this.get = function(id) {
              var deferred = $q.defer();

              $http.get(GlobalInfo.apiUrl+"/users/" + id)
                  .success(function(response) {
                        deferred.resolve(response);
                  })
                  .error(function(response) {
                        deferred.reject(response);
                  });

                return deferred.promise;
            };

  // CREATE
  this.create = function(model) {
              var deferred = $q.defer();

              $http.post(GlobalInfo.apiUrl+"/users/", model)
                  .success(function(response) {
                      deferred.resolve(response);
                  })
                  .error(function(response) {
                      deferred.reject(response);
                  });

              return deferred.promise;
          };

// UPDATE
  this.update = function(model) {
              var deferred = $q.defer();

              $http.put(GlobalInfo.apiUrl+"/users/"+model._id, model)
                  .success(function(response) {
                        deferred.resolve(response);
                  })
                  .error(function(response) {
                        deferred.reject(response);
                  });

              return deferred.promise;
          };


// SEARCH
this.search = function(nameUser) {
            var deferred = $q.defer();

            var found = $filter('filter')(_users.$$state.value, {
                name: nameUser
            }, false);
            deferred.resolve(found);
            return deferred.promise;
        };

// DELETE
this.delete = function(id) {
          var deferred = $q.defer();

          $http.delete(GlobalInfo.apiUrl+"/users/" + id)
              .success(function(response) {
                  deferred.resolve(response);
              })
              .error(function(response) {
                  deferred.reject(response);
              });

          return deferred.promise;
        };



})
