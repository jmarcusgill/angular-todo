app.run(function (FIREBASE_CONFIG) {
   firebase.initializeApp(FIREBASE_CONFIG);
});

app.config( function($routeProvider) {
  $routeProvider
    .when("/items/list", { //route you want to go to
      templateUrl: "partials/item-list.html",
      controller: "ItemListCtrl"
    })
    .when("/items/new", { //object with properties associaited with where you want to go
      templateUrl: "partials/item-new.html",
      controller: "ItemNewCtrl"
    })
    .when("/item/view/:id", { //:id is a placeholder, variable
      templateUrl: "partials/item-view.html",
      controller: "ItemViewCtrl"
    })
    .when("/item/edit/:id", {
      templateUrl: "partials/item-new.html",
      controller: "ItemEditCtrl"
    })
    .otherwise("/items/list"); //if i type in any other route than defined, take me here
});


app.controller("NavCtrl", function($scope) {
    $scope.cat = "Meow";
    $scope.navItems=[{name: "Logout"}, {name: "All Items"}, {name: "New Item"}];
});


app.controller("ItemListCtrl", function() {
  console.log("inside ItemListCtrl");
});

app.controller("ItemNewCtrl", function() {
  console.log("inside ItemNewCtrl");
});

app.controller("ItemViewCtrl", function() {
  console.log("inside ItemViewCtrl");
});

app.controller("ItemEditCtrl", function() {
  console.log("inside ItemEditCtrl");
});

//second controller -
//must pass in the scope to the variable
app.controller("ItemCtrl", ($http, $q, $scope, FIREBASE_CONFIG) => {
    $scope.dog="Woof!";
    $scope.showListView = true;
      $scope.items = [];

    $scope.newItem = () => {
        $scope.showListView = false;
        // console.log("new item");
    };

    $scope.allItems = () => {
        $scope.showListView = true;
        // console.log("all item");
    };

  let getItemList = () => {
    // this is different from the scope items.
    let itemz = [];
    // return new Promise ... would go here, instead you use $q
    return $q((resolve, reject) => {
      // $.ajax().done().fail ... this is what we were using. nad becasue there is another lib you need to put in the argument.
      $http.get(`${FIREBASE_CONFIG.databaseURL}/items.json`)
      .then((fbItems)=> {
        let itemCollection = fbItems.data;
        Object.keys(itemCollection).forEach((key) => {
            itemCollection[key].id=key;
            itemz.push(itemCollection[key]);
          });
          resolve(itemz);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };


    let getItems = () => {
      getItemList().then((itemz)=>{
        $scope.items = itemz;
      }).catch((error)=>{
        console.log("got and error", error);
      });
    };

  getItems();

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
      $scope.showListView = true;
      getItems();
    }).catch((error) => {
      console.log("Add error", error);
    });
  };


});


