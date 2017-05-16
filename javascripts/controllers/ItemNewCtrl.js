app.controller("ItemNewCtrl", function($http, $q, $scope, FIREBASE_CONFIG) {

  $scope.addNewItem = () => {
    $scope.newTask.isCompleted = false;
    postNewItem($scope.newTask).then((response) => {
      $scope.newTask = {};
      getItems();
    }).catch((error) => {
      console.log("Add error", error);
    });
  };
});