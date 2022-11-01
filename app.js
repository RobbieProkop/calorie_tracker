//Storeage Controller

// Item Controller

const ItemCtrl = (function () {
  console.log("iife :>> ");
})();

// UI Controller

const UICtrl = (function () {
  console.log("iife : UI ");
})();

// App Controller
const App = (function (ItemCtrl, UICtrl) {})(ItemCtrl, UICtrl);
