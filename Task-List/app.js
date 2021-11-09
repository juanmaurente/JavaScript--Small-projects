//Define UI VARS

const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');

const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');



//Load all event listeners
loadEventListeners();

function loadEventListeners(){
    //DOM load event stored
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event - IF i press click on Add Task
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);
    //Clear task event
    clearBtn.addEventListener('click',clearTasks)
    //filter task event
    filter.addEventListener('keyup', filterTasks)
    }


    // Add Task action that takes the event 
        function addTask(e){
        // if its empty request to add a task first else continue
        if (taskInput.value === '') {
            alert('Add a task');
        }
        else {

        
        // Create li element
        const li = document.createElement('li');
        //Add class. In materializd if lis should have class collection item
        li.className='collection-item';
        
        //Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        
        //Create new link element
        const link = document.createElement('a');
        
        //Add class
        link.className='delete-item secondary-content';
        
        //Add icon html
        link.innerHTML = '<i class="icon-remove"></i>';
        //Append the link to li
        li.appendChild(link);
        
        //Append li to ul
        taskList.appendChild(li);

        //Store in LocalStorage
        storeTaskInLocalStorage(taskInput.value);

        //Clear input
        taskInput.value = '';

        e.preventDefault();
    }
    }

//Remove tasks by clicking x icon
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
        e.target.parentElement.parentElement.remove();
        
        //Remove task from Local Storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}

// Clear Tasks
function clearTasks(){
   while(taskList.firstChild){
       taskList.removeChild(taskList.firstChild);
   }

   // clear tasks from local storage
   clearTasksFromLocalStorage();
}

//Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
    
}

//Store tasks in local storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Get tasks from LocalStorage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
            // Create li element
            const li = document.createElement('li');
            //Add class. In materializd if lis should have class collection item
            li.className='collection-item';
            
            //Create text node and append to li
            li.appendChild(document.createTextNode(task));
            
            //Create new link element
            const link = document.createElement('a');
            
            //Add class
            link.className='delete-item secondary-content';
            
            //Add icon html
            link.innerHTML = '<i class="icon-remove"></i>';
            //Append the link to li
            li.appendChild(link);
            
            //Append li to ul
            taskList.appendChild(li);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove task from Local Storage

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear tasks from Local Storage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}