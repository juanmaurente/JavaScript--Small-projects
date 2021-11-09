// Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

///--------------------------------
// UI Constructor
function UI(){}

// Add Book To List
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href=""# class="delete">X</a></td>`;
    
    list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert = function(message, className){
    //Create div
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    //Get a parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    //Insert alert
    container.insertBefore(div, form);
    // Timeout after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000)
}

// Clear Fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Delete Book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove(); //the 1st take us to td the second to tr
    }
}

// ---------------------------------
// Event Listeners
document.getElementById('book-form').addEventListener('submit', function(e){
    
    // Get data from fields
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;
    
    //instantiate a book
    const book = new Book(title, author, isbn);
    
    // instantiate UI
    const ui = new UI();

        // Check all fields are completed
        if (title === '' || author === ''|| isbn === ''){
            //Error Alert
            ui.showAlert('Pease fill in all fields', 'error')
        } else {
            // Add book to list
            ui.addBookToList(book);

            // Display success message
            ui.showAlert('Book Added' , 'success');

            // Clear fields from form
            ui.clearFields(); 
        }

        e.preventDefault();
});

// ----------------------
// Event delegation - Event listener for delete (x icon) - remember we have to select its parent
document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();

    ui.deleteBook(e.target);

    // Show message
    ui.showAlert('Book Removed', 'success');

    e.preventDefault();
})
