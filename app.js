//Storeage Controller

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
    items: [
      { id: 0, name: "Steak Dinner", calories: 2100 },
      { id: 1, name: "Cookie", calories: 200 },
      { id: 2, name: "Oatmeal Breaky", calories: 800 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  // Public methods to be returned
  return {
    getItems: () => {
      return data.items;
    },
    logData: () => {
      return data;
    },
  };
})();

// UI Controller

const UICtrl = (function () {
  // Public Methods to be returned
  return {
    populateItemList: (items) => {
      let html = "";

      items.forEach((item) => {
        html += `
          <li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
        </li>
        `;
      });

      //insert List Items
      document.getElementById("item-list").innerHTML = html;
    },
  };
})();

// App Controller
const App = (function (ItemCtrl, UICtrl) {
  //Public methods being returned
  return {
    init: () => {
      //fetch items from data structure
      const items = ItemCtrl.getItems();

      // Populate list with items

      UICtrl.populateItemList(items);
    },
  };
})(ItemCtrl, UICtrl);

//Initialize App
App.init();
