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


    
    */

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
            addBtn: '.add-btn',
            updateBtn: '.update-btn',
            deleteBtn: 'delete-btn',
            backBtn: '.back-btn',
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
            //(33) create the clear funciton to clean the input forms
            clearInput: function(){
                document.querySelector(UISelectors.itemNameInput).value = '';
                document.querySelector(UISelectors.itemCaloriesInput).value = '';
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
            /*clearEditState: function(){
                UICtrl.clearInput();
                //(44) Hide the buttons form the begining. They still show until in the init we call this
                document.querySelector(UISelectors.addBtn).style.display = 'inline';
                document.querySelector(UISelectors.deleteBtn).style.display = 'none';
                document.querySelector(UISelectors.backBtn).style.display = 'none';
                document.querySelector(UISelectors.updateBtn).style.display = 'none';
            },*/
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
        
        return {
            //(5)Initializer for the app. When we load the app returns a function
            init: function(){
                
                //(45) Clear edit state / set initial set
                //UICtrl.clearEditState();

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

