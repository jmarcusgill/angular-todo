//second controller -
//must pass in the scope to the variable
app.controller("ItemCtrl", ($http, $q, $scope, FIREBASE_CONFIG) => {
    $scope.dog="Woof!";


  let postNewItem = (newItem) => {
    return $q ((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/items.json`, JSON.stringify(newItem))
      .then((resultz) => {
        resolve(resultz);
      }).catch((error) => {
        reject(error);
      });
    });
  };

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


