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
