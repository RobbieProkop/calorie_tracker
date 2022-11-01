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
  //put in a variable in the event that the id changes
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemName: "#item-name",
    itemCalories: "#item-calories",
  };

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
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    //get item input
    getItemInput: () => {
      const name = document.querySelector(UISelectors.itemName).value;
      const calories = document.querySelector(UISelectors.itemCalories).value;

      console.log("name :>> ", name);
      console.log("calories :>> ", calories);
      return {
        name,
        calories,
      };
    },

    //makes private selectors public
    getSelectors: () => {
      return UISelectors;
    },
  };
})();

// App Controller
const App = (function (ItemCtrl, UICtrl) {
  //add event listener function
  const loadEventListeners = () => {
    //get UI selectors
    const UISelectors = UICtrl.getSelectors();

    //add event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);
  };

  // add Item submit
  const itemAddSubmit = (e) => {
    e.preventDefault();

    // get form input
    const input = UICtrl.getItemInput();
  };

  //Public methods being returned
  return {
    init: () => {
      //fetch items from data structure
      const items = ItemCtrl.getItems();

      // Populate list with items
      UICtrl.populateItemList(items);

      //load event listeners
      loadEventListeners();

      UICtrl.getItemInput();
    },
  };
})(ItemCtrl, UICtrl);

//Initialize App
App.init();
