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
      // { id: 0, name: "Steak Dinner", calories: 2100 },
      // { id: 1, name: "Cookie", calories: 200 },
      // { id: 2, name: "Oatmeal Breaky", calories: 800 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  // Public methods to be returned
  return {
    getItems: () => {
      console.log("data :>> ", data);
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
      console.log("newItem :>> ", newItem);

      //add to items array
      data.items.push(newItem);

      return newItem;
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

    //adding new item to UI list
    addListItem: (item) => {
      //Create li element
      const li = document.createElement("li");
      //add classes
      li.className = "collection-item";
      // add id
      console.log("item :>> ", item);
      li.id = `item-${item.id}`;
      //add html
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      //insert item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
      console.log("li :>> ", li);
    },

    //get item input
    getItemInput: () => {
      const name = document.querySelector(UISelectors.itemName).value;
      const calories = document.querySelector(UISelectors.itemCalories).value;

      return {
        name,
        calories,
      };
    },

    clearInput: () => {
      document.querySelector(UISelectors.itemName).value = "";
      document.querySelector(UISelectors.itemCalories).value = "";
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

    //check for name and calorie input
    if (!input.name || !input.calories) {
      //Add custom error message
      return alert("yo. enter the fields!");
    }
    console.log("input :>> ", input);
    const newItem = ItemCtrl.addItem(input.name, input.calories);
    console.log(newItem);

    //add to UI list
    UICtrl.addListItem(newItem);

    //clear inputs
    UICtrl.clearInput();
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
