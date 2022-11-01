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
    items: [],
    currentItem: null,
    totalCalories: 0,
  };
})();

// UI Controller

const UICtrl = (function () {
  console.log("iife : UI ");
})();

// App Controller
const App = (function (ItemCtrl, UICtrl) {})(ItemCtrl, UICtrl);
