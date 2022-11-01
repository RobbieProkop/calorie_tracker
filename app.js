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
  };
})();

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

// UI Controller
const UICtrl = (function () {
  //put in a variable in the event that the id changes
  const UISelectors = {
    itemList: "#item-list",
    listItems: "#item-list li",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    clearBtn: ".clear-btn",
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

    updateListItem: (item) => {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      //iterate through node list. first need an array
      listItems = Array.from(listItems);

      listItems.forEach((listItem) => {
        const itemID = listItem.getAttribute("id");

        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      });
    },

    deleteListItem: (id) => {
      console.log("id", id);
      const itemID = `#item-${id}`;

      const item = document.querySelector(itemID);
      console.log("item :>> ", item);
      item.remove();
    },

    clearInput: () => {
      document.querySelector(UISelectors.itemName).value = "";
      document.querySelector(UISelectors.itemCalories).value = "";
    },

    addItemToForm: () => {
      document.querySelector(UISelectors.itemName).value =
        ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCalories).value =
        ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },

    removeItems: () => {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      //  turn node list into an array
      listItems = Array.from(listItems);

      listItems.forEach((item) => {
        item.remove();
      });
    },

    hideList: () => {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },

    showTotalCalories: (totalCalories) => {
      document.querySelector(UISelectors.totalCalories).textContent =
        totalCalories;
    },

    clearEditState: () => {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },

    showEditState: () => {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },

    //makes private selectors public
    getSelectors: () => {
      return UISelectors;
    },
  };
})();

// App Controller
const App = (function (ItemCtrl, StorageCtrl, UICtrl) {
  //add event listener function
  const loadEventListeners = () => {
    //get UI selectors
    const UISelectors = UICtrl.getSelectors();

    //add event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    //disable submit with enter
    document.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        return false;
      }
    });
    // edit event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);

    //  Update edit submit event
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", itemUpdateSubmit);

    // back btn event
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", UICtrl.clearEditState);

    //  delete btn event
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", itemDeleteSubmit);

    // clearitems event
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener("click", clearAllItemsClick);
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

    //Add to local Storage
    StorageCtrl.storeItem(newItem);

    //clear inputs
    UICtrl.clearInput();
  };

  //click edit btn
  const itemEditClick = (e) => {
    e.preventDefault();

    //need to use event delegation because this class is not initially in the dom
    if (e.target.classList.contains("edit-item")) {
      //get list item id
      const listId = e.target.parentElement.parentElement.id;

      // Break into an array
      const listIdArr = listId.split("-");
      // get id
      const id = Number(listIdArr[1]);
      //get item
      const itemToEdit = ItemCtrl.getItemById(id);
      //set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      //add item to inputs
      UICtrl.addItemToForm();
    }
  };

  //edit submit
  const itemUpdateSubmit = (e) => {
    e.preventDefault();
    // Get Item input
    const input = UICtrl.getItemInput();
    // update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    //  update UI
    UICtrl.updateListItem(updatedItem);

    //get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    //add total calories to html
    UICtrl.showTotalCalories(totalCalories);

    //Update LS
    StorageCtrl.updateItemStorage(updatedItem);

    UICtrl.clearEditState();
  };

  //delete submit
  const itemDeleteSubmit = (e) => {
    e.preventDefault();

    //get currentItem
    const currentItem = ItemCtrl.getCurrentItem();

    //delete from data structure
    ItemCtrl.deleteItem(currentItem.id);

    //delete from ui
    UICtrl.deleteListItem(currentItem.id);

    //get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    //add total calories to html
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();

    if (!ItemCtrl.data) {
      UICtrl.hideList();
    }
  };

  //clear all event
  const clearAllItemsClick = (e) => {
    e.preventDefault();

    // delete all items from data structure
    ItemCtrl.clearAllItems();

    //get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    //add total calories to html
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();

    // Remove from UI
    UICtrl.removeItems();

    //hide ul
    UICtrl.hideList();
  };

  //Public methods being returned
  return {
    init: () => {
      //clearedit state / set initial state
      UICtrl.clearEditState();

      //fetch items from data structure
      const items = ItemCtrl.getItems();

      //check if there are items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        //get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        //add total calories to html
        UICtrl.showTotalCalories(totalCalories);
        // Populate list with items
        UICtrl.populateItemList(items);
      }

      //load event listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, StorageCtrl, UICtrl);

//Initialize App
App.init();
