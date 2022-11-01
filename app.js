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
      //harcoded data for testing
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

// UI Controller

const UICtrl = (function () {
  //put in a variable in the event that the id changes
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemName: "#item-name",
    itemCalories: "#item-calories",
    totalCalories: ".total-calories",
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
      //show list
      document.querySelector(UISelectors.itemList).style.display = "block";
      //Create li element
      const li = document.createElement("li");
      //add classes
      li.className = "collection-item";
      // add id

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
    },

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

    hideList: () => {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },

    showTotalCalories: (totalCalories) => {
      document.querySelector(UISelectors.totalCalories).textContent =
        totalCalories;
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

    const newItem = ItemCtrl.addItem(input.name, input.calories);

    //add to UI list
    UICtrl.addListItem(newItem);

    //get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    //add total calories to html
    UICtrl.showTotalCalories(totalCalories);

    //clear inputs
    UICtrl.clearInput();
  };

  //Public methods being returned
  return {
    init: () => {
      //fetch items from data structure
      const items = ItemCtrl.getItems();

      //check if there are items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }

      //load event listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

//Initialize App
App.init();
