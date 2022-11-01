//Storeage Controller
const StorageCtrl = (() => {
  // public methods to be returned
  return {
    storeItem: (item) => {
      //get from LS, or else set as empty array
      let items = JSON.parse(localStorage.getItem("items")) || [];

      //push the new item to the items array
      items.push(item);

      //set LS
      localStorage.setItem("items", JSON.stringify(items));
    },
    getItemsFromStorage: () => {
      let items = JSON.parse(localStorage.getItem("items")) || [];
      return items;
    },
    updateItemStorage: (updatedItem) => {
      let items = JSON.parse(localStorage.getItem("items"));

      items.forEach((item, index) => {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }

        localStorage.setItem("items", JSON.stringify(items));
      });
    },
    deleteItemFromStorage: (id) => {
      let items = JSON.parse(localStorage.getItem("items"));

      items.forEach((item, index) => {
        if (id === item.id) {
          items.splice(index, 1);
        }

        localStorage.setItem("items", JSON.stringify(items));
      });
    },
    clearAllItemsFromStorage: () => {
      localStorage.removeItem("items");
    },
  };
})();
