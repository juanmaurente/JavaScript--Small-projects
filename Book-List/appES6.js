class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{

    addBookToList(book){
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

    showAlert(message, className) {
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

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove(); //the 1st take us to td the second to tr
        }
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

//Local Storage Class

class Store {
    static getBooks(){
        let books;
        if (localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }
    
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function(book) {
        const ui = new UI;
        
        // Add book to UI
        ui.addBookToList(book);            
        });
    };
    

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach(function(book, index){
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
        
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listeners for Add book
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

            //Add book to LocalStorage
            Store.addBook(book);

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
    // Instantiate UI
    const ui = new UI();

    // Delete book
    ui.deleteBook(e.target);

    // Remove book from LocalStorage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show message
    ui.showAlert('Book Removed', 'success');

    e.preventDefault();
})
