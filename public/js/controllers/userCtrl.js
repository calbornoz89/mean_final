angular.module('pokeApp.userCtrl',[])

.controller('userCtrl', function(User, LxDialogService, LxNotificationService){
  var vm = this;


  vm.dialogId = 'dialog-test';
          vm.dialogIdEdit = 'dialog-edit';

          vm.infoUser = {};
          vm.model = {};
          vm.add = function() {
              vm.model = {};
              LxDialogService.open(vm.dialogIdEdit);

          }



  vm.message = 'Este es el Admin de usuario';


  User.all().then(function(response){
          vm.users = response;
        })



vm.save = function(model) {
  if (!model._id) {
    User.create(model).then(
      function(response) {
        LxDialogService.close(vm.dialogIdEdit);
        location.reload();
        getUsers();
      },
      function(response) { });

    } else {
      User.update(model).then(function(response) {
        LxDialogService.close(vm.dialogIdEdit);
        location.reload();
        getUsers();
      },
      function(response) { });
    }
  };


vm.edit = function(id) {
  User.get(id).then(
    function(response) {
      vm.model = response;
      LxDialogService.open(vm.dialogIdEdit);
    },
    function(response) { });
  };



vm.search = function() {
  User.search(vm.searchUser).then(
    function(response) {
      vm.users = response;
    },
    function(response) {  });
  };


vm.delete = function(id) {
  User.delete(id).then(
    function(response) {
      location.reload();
      getUsers();
    },
    function(response) { });
  };


var getUsers = function() {
  User.all().then(
    function(response) {
      vm.users = response;
    },
    function(response) { });
  };


vm.openDialog = function(id) {
  User.get(id).then(
    function(response) {
      vm.infoUser = response;
      LxDialogService.open(vm.dialogId);
    },
    function(response) {

    });
  };


  getUsers();
})
