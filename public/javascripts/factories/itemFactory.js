app.factory("ItemFactory", function($http, $q, FIREBASE_CONFIG) {

  let getItemList = (userId) => {
    // this is different from the scope items.
    let itemz = [];
    // return new Promise ... would go here, instead you use $q
    return $q((resolve, reject) => {
      // $.ajax().done().fail ... this is what we were using. nad becasue there is another lib you need to put in the argument.
      $http.get(`${FIREBASE_CONFIG.databaseURL}/items.json?orderBy="uid"&equalTo="${userId}"`)
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

  let getSingleItem = (id) => {
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/items/${id}.json`)
      .then((resultz) => {
        resultz.data.id = id;
        resolve(resultz);
      }).catch((error) => {
        console.log(error);
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

  let editItem = (item) => {
    console.log("item", item);
    return $q((resolve, reject) => {
      $http.put(`${FIREBASE_CONFIG.databaseURL}/items/${item.id}.json`,
        JSON.stringify({
          assignedTo: item.assignedTo,
          isCompleted: item.isCompleted,
          task: item.task,
          uid: item.uid,
          dueDate: item.dueDate
        })
        ).then((resultz) => {
        resolve(resultz);
      }).catch((error) => {
        console.log("error", error);
      });
    });
  };








  return {getItemList:getItemList, getSingleItem:getSingleItem, postNewItem:postNewItem, deletz:deletz, editItem:editItem}; //when called, finds this function and executes it

});