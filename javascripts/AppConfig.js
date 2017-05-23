app.run(function (FIREBASE_CONFIG) {
   firebase.initializeApp(FIREBASE_CONFIG);
});

app.config( function($routeProvider) {
  $routeProvider
    .when("/auth", { //route you want to go to
      templateUrl: "partials/auth.html",
      controller: "AuthCtrl"
    })
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
    .when("/logout", {
      templateUrl: "partials/auth.html",
      controller: "AuthCtrl"
    })
    .otherwise("/auth"); //if i type in any other route than defined, take me here
});