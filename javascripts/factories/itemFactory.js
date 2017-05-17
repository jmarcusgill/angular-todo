app.factory("ItemFactory", function($http, $q, FIREBASE_CONFIG) {

  let getItemList = () => {
    // this is different from the scope items.
    let itemz = [];
    // return new Promise ... would go here, instead you use $q
    return $q((resolve, reject) => {
      // $.ajax().done().fail ... this is what we were using. nad becasue there is another lib you need to put in the argument.
      $http.get(`${FIREBASE_CONFIG.databaseURL}/items.json`)
      .then((fbItems)=> {
        let itemCollection = fbItems.data;
        if (itemCollection !== null) {
          Object.keys(itemCollection).forEach((key) => {
              itemCollection[key].id=key;
              itemz.push(itemCollection[key]);
            });
        }
          resolve(itemz);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };

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

  let deletz = (itemId) => {
    return $q((resolve, reject) => {
      $http.delete(`${FIREBASE_CONFIG.databaseURL}/items/${itemId}.json`)
      .then((resultz) => {
        resolve(resultz);
      }).catch((error) => {
        console.log("error", error);
      });
    });
  };








  return {getItemList:getItemList, postNewItem:postNewItem, deletz:deletz}; //when called, finds this function and executes it

});