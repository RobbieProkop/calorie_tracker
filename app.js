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

    //Delete from LS
    StorageCtrl.deleteItemFromStorage(currentItem.id);

    UICtrl.clearEditState();
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

    //remove all from LS
    StorageCtrl.clearAllItemsFromStorage();

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
