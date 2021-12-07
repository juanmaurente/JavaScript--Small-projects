//Storage Controller
//   (1) Create different Module Controllers
const StorageCtrl = (function(){
            
})()

//Item Controller
//   (1) Create different Module Controllers
const ItemCtrl = (function(){
    
    //(2) Item Constructor for each meal
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //(3) Create the Data Structures. This items are private
    const data = {
        
        /* (34) remove the hardcoded data
        items: [ //Hardcoded data to have something to start
            {id: 0, name:'Steak Dinner', calories: 1200},
            {id: 1, name:'Cookie', calories: 400},
            {id: 2, name:'Eggs', calories: 300} 
        ]*/
        
        items:[],
        currentItem: null,
        totalCalories: 0
    }

    //(4) What we return. We are leaving public the data accessng through function logDFata
    return {
        //(6) getitems function, so we can get items from other methods
        getItems:function(){
            return data.items;
        },

        //(23) Add items into the data structure
        addItem: function(name, calories){
            let ID;    
            //(24) we need to generate an id
            if(data.items.length > 0){
                ID = data.items[data.items.length -1].id + 1;
            } else {
                ID = 0;
            }

            //(25) parse calories as number (its taken as string)
            calories = parseInt(calories);

            //(26) create the item with the constructor
            newItem = new Item(ID, name, calories);

            //(27) push the new item into the items array
            data.items.push(newItem);

            
            return newItem;
        },
        //(48) get the element by id. loop throug the items, if the id that has been passed is there, we return that item
        getItemById: function(id){
            let found = null;
            // Loop through items
            data.items.forEach(function(item){
                if(item.id === id){
                found = item;
                }
            });
            return found;
            },
            //(57) Update Item function
        updateItem: function(name, calories){
                //Calories to number
                calories = parseInt(calories);

                let found = null;
                data.items.forEach(function(item){
                    if(item.id === data.currentItem.id){
                        item.name = name;
                        item.calories = calories;
                        found = item;
                    }

                });
                return found;

            },
        deleteItem: function(id){
            // Get ids
            const ids = data.items.map(function(item){
                return item.id;
            });
        
            // Get index
            const index = ids.indexOf(id);
        
            // Remove item
            data.items.splice(index, 1);
        },
        clearAllItems: function(){
            data.items = [];
        },
            //(50) set current item to item
        setCurrentItem: function(item){
            data.currentItem = item;
            },
            // get the current item
        getCurrentItem: function(){
            return data.currentItem;
            },
        
            //(38) Create the getTotalCalories function
        getTotalCalories: function(){   //loop throuh the list items and take the calories
            let total = 0;

            data.items.forEach(function(item){
                total += item.calories;
            });
            //(39) set total calories in data structure
            data.totalCalories = total;

            return data.totalCalories
        },
        logData: function(){
            return data;
        }
        }
})();



//UI Controller
//   (1) Create different Module Controllers
const UICtrl = (function(){

    //(10) Initialize an object called ui selectors. Doing this way it's easier to modify the code in case of changes
    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
      }

    return {
        //(9) create function populate List that loops through the items and make each into a list item and insert into the <ul>
        populateItemList: function(items){
            let html = '';
            
            items.forEach(function(item) {
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                  <i class="edit-item fa fa-pencil"></i>
                </a>
              </li>`
            });

            //(11) Insert list items into the item container
            document.querySelector(UISelectors.itemList).innerHTML = html;

        },
        // (19) Return an object with the name and calories
        getItemInput: function(){
            return { //as it is an input we need the .value
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        //(29) create the addListItem function
        addListItem: function(item){

            //(37) Show the list of items
            document.querySelector(UISelectors.itemList).style.display = 'block';

            //(30) create a li element with class collection item and id
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            
            //Add HTML
            li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>`;

                //(31) Insert Item the Item that has been created
                document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);

        },
        //(59) Create the updateItem function
        updateListItem: function(item){
            let listItems = document.querySelectorAll(UISelectors.listItems);

            //as it returns a node list we cannot use forEach. convert to array
            listItems = Array.from(listItems);

            listItems.forEach(function(listItem){
                const itemID = listItem.getAttribute('id');

                if(itemID === `item-${item.id}`){
                    document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                      <i class="edit-item fa fa-pencil"></i>
                    </a>`
                }
            })

        },
        deleteListItem: function(id){
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },
        //(33) create the clear funciton to clean the input forms
        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        // (52)add the current item that has been selected into the form inputs
        addItemToForm: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        removeItems: function(){
            let listItems = document.querySelectorAll(UISelectors.listItems);
        
            // Turn Node list into array
            listItems = Array.from(listItems);
        
            listItems.forEach(function(item){
                item.remove();
            });
        },
        //(35) hide the list to avoid the line
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        //(41) create showTotalCalories
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        //43) EDIT BUTTON UI Controler create a method ClearEditState function
        clearEditState: function(){
            UICtrl.clearInput();
            //(44) Hide the buttons form the begining. They still show until in the init we call this
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';  
        },
        //()----------------------------------------------------------------------------------------------
        showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
          },
        //(12) make public our UISelectors list
        getSelectors: function(){
            return UISelectors;
        }
    }
})()

//App Controller
//   (1) Create different Module Controllers. We have to insert the other contrllers into this one and storage
const App = (function(ItemCtrl, UICtrl){
    
    //(13) Load event listeners in which all events will go in there
    const loadEventListeners = function(){
        //Get UI SELECTORS
        const UISelectors = UICtrl.getSelectors();
        
        //(14) Add Item Event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
        
        //(56) Disable add values with key enter
        document.addEventListener('keypress', function(e){
            if(e.keycode === 13 || e.which === 13){
                e.preventDefault();
                return false;
            }
        })

        //(45)Edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        //(54) Update button click event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        // Delete item event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        // Back button event
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

        // Clear items event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
    }

    //(15) Create item Add Submit function
    const itemAddSubmit = function(e){
        
        //(17) console log to check listening button is working
        // console.log('add');

        //(18) Get form input from UI Controler in 19
        const input = UICtrl.getItemInput();

        //(20) Test if we get the meal and calories
        //console.log(input);

        //(21) Check for name and calories input. test if they are not empty then add
        if(input.name !== '' && input.calories !== ''){
            
            // (21) test if its working. empty do nothing, both log 123
            //console.log(123);

            //(22) Add the item through the function we create in item controller's data structure 23
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            //(28) Add the item to the UI list through a function addListItme we create in 29
            UICtrl.addListItem(newItem);

            //(37) Get the total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            //(40) Add total calories to the UI
            UICtrl.showTotalCalories(totalCalories);

            //(32) Clear Fields after added
            UICtrl.clearInput();
        }
        
        e.preventDefault();
    }
    
    //(46) Click edit item
    const itemEditClick = function(e){
        // (47) fix the target so it just works when we click on the icon not the entire li
        if(e.target.classList.contains('edit-item')){
          
            // Get list item id (we will get item-0, item-1, item-2, etc )
          const listId = e.target.parentNode.parentNode.id;
    
          // Break into an array. this way will give us the item in one side, then the id ["item", "0"]
          const listIdArr = listId.split('-');
    
          // Get the actual id, get it as a number
          const id = parseInt(listIdArr[1]);
    
          // Get item throug a function we do in 48)
          const itemToEdit = ItemCtrl.getItemById(id);
    
          // Set current item that is going to be defined in 49
          ItemCtrl.setCurrentItem(itemToEdit);
    
          // (51) Add item data to form inputs
          UICtrl.addItemToForm();
        }
        //else nothing
    
        e.preventDefault();
      }

      //(55) Create the Update submit function
      const itemUpdateSubmit = function(e){
       //Get item input
       const input = UICtrl.getItemInput();

       //Update item
       const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
       
       // 58) update the UI with the updated item
       UICtrl.updateListItem(updatedItem);
            // 60) Get the total calories copied from 37 and 40
            const totalCalories = ItemCtrl.getTotalCalories();
            UICtrl.showTotalCalories(totalCalories);

            UICtrl.clearEditState();

        e.preventDefault();
      }

        // Delete button event
        const itemDeleteSubmit = function(e){
        // Get current item
        const currentItem = ItemCtrl.getCurrentItem();

        // Delete from data structure
        ItemCtrl.deleteItem(currentItem.id);

        // Delete from UI
        UICtrl.deleteListItem(currentItem.id);

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        UICtrl.clearEditState();

        e.preventDefault();
        }

        // Clear items event
        const clearAllItemsClick = function(){
        // Delete all items from data structure
        ItemCtrl.clearAllItems();

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // Remove from UI
        UICtrl.removeItems();

        // Hide UL
        UICtrl.hideList();
            
        }

    return {
        //(5)Initializer for the app. When we load the app returns a function
        init: function(){
            
            //(45) Clear edit state / set initial set
            UICtrl.clearEditState();

            //(7) Fetch all items from data structure
            const items = ItemCtrl.getItems();

            //(36)Check if any items to display or not the list
            if(items.length === 0){
                UICtrl.hideList();
            } else {
                //(8) Populate list with items with populateItemList function created at (9)
                UICtrl.populateItemList(items);
            }

             //(41) Get the total calories copied from 37 and 40
             const totalCalories = ItemCtrl.getTotalCalories();
             UICtrl.showTotalCalories(totalCalories);

            //(16) Load Event Listeners (call the function in 15)
            loadEventListeners();
        }
    }

})(ItemCtrl, UICtrl);

App.init();





     /*Understanding what we have so far
    1) Create the modules ---- 2) Create the Object Item constructor ---- 
    3) Hardcode our data structure --- as it is private we 4) we return our items
    5) We create our initialize function 7) brings the items from the data
    8) Populate a the list of items into a variable item, calling the UI function
    9) popluate list-item starts from empty html, and adds each item into an <li>
        with += we don't overwrite each item but creates many li's
    10) Start a list of UI selectors which we'll populate with all html elements we need
    11) put all li's into the container
    12) we crate a functions to get the selectors from 10, and return them to access
    13) we started the loadEvent listeners for the buttons
    14) First button which is the Add button. clicks does a function
    15) we create the itemAddSubmit function, which taces the input from the form
    16) we include the call function in the initializer
    17) log to test
    18) get input from form
    19) we process the getInput dunction which returns an object
    20) test --- 21) check if form is empty
    22) add the item 
    23) create the addItem function
    24) create an auto-id generator
    25) convert calories string into number
    26) create the item using constructor
    27) push it into the data structure
    28) Add the item to the UI list through a function addListItme we create in 29
    29) Create the addListItem function into UI controler
    30) Create a <li> and ------ 31) Insert the Item into ItemList crated at 10
    32) We clear the inputs after added by a function on 33) of UI Controler
    34) remove hardcoded data
    35) hide the list item container if is empty in UI Controler
    36) in the initializer check if no items hide/ else populate addition to 8) and 9)
    37) in App Controller create the totalCalories variable from the function in 38) Item Controler
    38) In Item Controller create getTotalCalories function
    39) set total calories and return it 
    40) Add total calories to the UI
    41) create showTotalCalories and display it through the UI
    42) We want 37 and 40 when the app initialize
    -------------------
    43) Working with edit button. UI Controler create a method ClearEditState function
    44)uncomment html buttons, add them to the uiselectors but then hide them
    45)Edit icon click event. Event Delegation
    46) Create the click edit item in App Control
    47) target only when we click on the icon
    48) Get the id of the item selected in Item Control, and return it
    49) 
    50) set the current item to the item
    51) Add item data to form inputs
    52) crete the functions which inserts the data into the form inputs
    ---------------------
    53) Update item event when we click the update button
    54) Create the event listener for clicking the button
    55) Create the Update submit function
    56) Disable add values with the "enter" key
    57) UpdateItem function into Item Controller
    58) update the UI with the updated item
    59) in the UI controller, create UpdateItem function
    60) update the total calories after updated. copied from 41
    ----------------------------------

    61) Working with the back button. In app controller create a listener and use clearEditState function
    62) Working with delete button
    63) Create the itemDeleteSubmit event
    64) Create the delete Item function in Item Control

    
    */


