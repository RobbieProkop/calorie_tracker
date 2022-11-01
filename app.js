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

  return {
    logData: () => {
      return data;
    },
  };
})();

// UI Controller

const UICtrl = (function () {
  console.log("iife : UI ");
})();

// App Controller
const App = (function (ItemCtrl, UICtrl) {
  console.log("itemData :>> ", ItemCtrl.logData());
})(ItemCtrl, UICtrl);
