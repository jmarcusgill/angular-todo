// app.run((FIREBASE_CONFIG) => { //I want to be able to access this
//   firebase.initializeApp(FIREBASE_CONFIG);
// });

// app.controller("NavCtrl", ($scope) => { //iify that controls navbar in html
// //$scope connects to dom

//   $scope.cat = "Meow";
//   $scope.navItems = [{name: "Logout"}, {name: "All Items"}, {name: "New Item"}]; //must be same key
// });

// app.controller("ItemCtrl", ($http, $q, $scope, FIREBASE_CONFIG) => {
//   $scope.dog = "Woof!";

//   $scope.showListView = true; //this is what is read on page load
//   $scope.items = [];

//   $scope.newItem = () => {
//     $scope.showListView = false;
//     console.log("new item");
//   };

//   $scope.allItems = () => {
//     $scope.showListView = true;
//     console.log("all items");
//   };

//   let getItemList = () => {
//     let itemz = [];
//     return $q ((resolve, reject) => {
//       $http.get(`${FIREBASE_CONFIG.databaseURL}`/items.json)
//       .then((fbItems) =>{
//         resolve(fbItems);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//     });
//   };

//     let getItems = () => {
//       getItemList().then((itemz) => {
//         console.log("itemz", itemz);
//       }).catch((error) => {
//         console.log("get error", error);
//       });
//     };

//     getItems();




// });

app.run((FIREBASE_CONFIG) => {
   firebase.initializeApp(FIREBASE_CONFIG);
});

app.controller("NavCtrl", ($scope)=> {
    $scope.cat = "Meow";
    $scope.navItems=[{name: "Logout"}, {name: "All Items"}, {name: "New Item"}];
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


