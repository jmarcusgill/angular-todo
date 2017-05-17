app.controller("ItemListCtrl", function($scope, ItemFactory) {

  $scope.items = [];

  let getItems = () => {
    ItemFactory.getItemList().then((itemz)=>{
      $scope.items = itemz;
    }).catch((error)=> {
      console.log("got and error", error);
    });
  };

  getItems();

    $scope.deleteItem = (id) => {
      ItemFactory.deletz(id).then(() => {
        getItems();
      }).catch((error) => {
        console.log("delteItem error", error);
      });
    };

    $scope.inputChange = (item) => {
      ItemFactory.editItem(item).then(() => {

      }).catch((error) => {
        console.log("inputChange error", error);
      });
    };



  });