app.controller("ItemListCtrl", function($scope, ItemFactory) {

  $scope.items = [];

    ItemFactory.getItemList().then((itemz)=>{
      $scope.items = itemz;
    }).catch((error)=>{
      console.log("got and error", error);
    });
  });