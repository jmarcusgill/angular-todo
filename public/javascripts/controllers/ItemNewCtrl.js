app.controller("ItemNewCtrl", function($rootScope, $http, $location, $q, $scope, FIREBASE_CONFIG, ItemFactory) {

  $scope.addNewItem = () => {
    $scope.newTask.isCompleted = false;
    $scope.newTask.uid = $rootScope.user.uid;
    ItemFactory.postNewItem($scope.newTask).then((response) => {
      $scope.newTask = {};
      $location.url("/items/list");
      // getItems();
    }).catch((error) => {
      console.log("Add error", error);
    });
  };
});