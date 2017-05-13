app.controller("NavCtrl", ($scope) => { //iify that controls navbar in html
//$scope connects to dom

  $scope.cat = "Meow";
  $scope.navItems = [{name: "Logout"}, {name: "All Items"}, {name: "New Item"}]; //must be same key
});

app.controller("ItemCtrl", ($scope) => {
  $scope.dog = "Woof!";

  $scope.showListView = true; //this is what is read on page load
  $scope.items = [];

  $scope.newItem = () => {
    $scope.showListView = false;
    console.log("new item");
  };

  $scope.allItems = () => {
    $scope.showListView = true;
    console.log("all items");
  };


});



