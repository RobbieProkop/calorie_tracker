// Item Controller
const ItemCtrl = (function () {
  // Item Constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  //Data Structure / state
  const data = {
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0,
  };

  // Public methods to be returned
  return {
    getItems: () => {
      return data.items;
    },

    addItem: (name, calories) => {
      let ID;
      //create id
      if (data.items.length <= 0) {
        ID = 0;
      }
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      }

      //calories to number
      calories = Number(calories);

      //create new Item
      newItem = new Item(ID, name, calories);

      //add to items array
      data.items.push(newItem);

      return newItem;
    },

    getItemById: (id) => {
      const found = data.items.filter((item) => item.id === id);
      return found[0];
    },

    updateItem: (name, calories) => {
      calories = parseInt(calories);

      let found = null;
      data.items.filter((item) => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },

    deleteItem: (id) => {
      //get the ids
      ids = data.items.map((item) => {
        return item.id;
      });

      //get the index
      const index = ids.indexOf(id);

      //remove from array
      data.items.splice(index, 1);
    },

    clearAllItems: () => {
      data.items = [];
    },

    setCurrentItem: (item) => {
      data.currentItem = item;
    },

    getCurrentItem: () => {
      return data.currentItem;
    },

    getTotalCalories: () => {
      let totalCalories = 0;

      data.items.forEach((item) => {
        totalCalories += item.calories;
      });
      // set total cal in data structure
      return (data.totalCalories = totalCalories);
    },

    logData: () => {
      return data;
    },
  };
})();
