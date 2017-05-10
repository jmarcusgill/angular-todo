var app = angular.module("TodoApp", []);

  app.controller("NavCtrl", ($scope) => { //iify that controls navbar in html
  //$scope connects to dom

    $scope.cat = "Meow";
    $scope.navItems = [{name: "Logout"}, {name: "All Items"}, {name: "New Item"}]; //must be same key
  });

  app.controller("ItemCtrl", ($scope) => {
    $scope.dog = "Woof!";
  });

