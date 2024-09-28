// อดินันท์ สุวรรณโณชิน 1650708017
// สร้าง Enum ไว้เก็บ Genre
var Genre;
(function (Genre) {
    Genre["Fiction"] = "Fiction";
    Genre["NonFiction"] = "Non-Fiction";
    Genre["Science"] = "Science";
    Genre["History"] = "History";
    Genre["Action"] = "Action";
    Genre["Comedy"] = "Comedy";
    Genre["Thriller"] = "Thriller";
    Genre["Romance"] = "Romance";
    Genre["Drama"] = "Drama";
    Genre["SuperHero"] = "SuperHero";
    Genre["Horror"] = "Horror";
})(Genre || (Genre = {}));
// Attach functions to window object
window.addBookToLibrary = addBookToLibrary;
window.updateBookInLibrary = updateBookInLibrary;
window.searchBookInLibrary = searchBookInLibrary;
window.saveLibraryData = saveLibraryData;
window.loadLibraryData = loadLibraryData;
// สร้าง class ชื่อ Library ใช้จัดการหนังสือ(ไว้ใส่ฟังก์ชั่น)
var Library = /** @class */ (function () {
    function Library() {
        this.books = [];
    }
    Library.prototype.addBook = function (book) {
        this.books.push(book);
        console.log("".concat(book.title, " added to library."));
    };
    Library.prototype.listBooks = function () {
        console.log("List of books in the library:");
        this.books.forEach(function (book) { return console.log("- ".concat(book.title, " by ").concat(book.author, " (").concat(book.genre, ", ").concat(book.publishedYear, ")")); });
    };
    Library.prototype.searchBooks = function (field, value) {
        var results = this.books.filter(function (book) { return book[field] === value; });
        if (results.length > 0) {
            console.log("Found: ".concat(results[0].title, " by ").concat(results[0].author));
        }
        else {
            console.log("No book found with the given criteria.");
        }
    };
    Library.prototype.updateBook = function (id, updatedFields) {
        var book = this.books.find(function (b) { return b.id === id; });
        if (book) {
            Object.assign(book, updatedFields);
            console.log("Book with id ".concat(id, " updated to: ").concat(JSON.stringify(book)));
        }
        else {
            console.log("Book with id ".concat(id, " not found for update."));
        }
    };
    Library.prototype.deleteBook = function (id) {
        var initialLength = this.books.length;
        this.books = this.books.filter(function (book) { return book.id !== id; });
        if (this.books.length < initialLength) {
            console.log("Book with id ".concat(id, " deleted."));
        }
        else {
            console.log("Book with id ".concat(id, " not found for deletion."));
        }
    };
    // Save to localStorage instead of file
    Library.prototype.saveToFile = function (filePath) {
        localStorage.setItem('libraryData', JSON.stringify(this.books));
        console.log("Library data saved to localStorage.");
    };
    // Load from localStorage instead of file
    Library.prototype.loadFromFile = function (filePath) {
        var data = localStorage.getItem('libraryData');
        if (data) {
            this.books = JSON.parse(data);
            console.log("Library data loaded from localStorage.");
            this.listBooks(); // Display loaded books
        }
        else {
            console.log("No saved data found in localStorage.");
        }
    };
    return Library;
}());
// สร้างตัวอย่างของ Library และใช้งานฟังก์ชันต่าง ๆ โดยตรง
// Instance of the library manager
var libraryManager = new Library();
// Function to add a book from the form
function addBookToLibrary() {
    var title = document.getElementById('add-title').value;
    var author = document.getElementById('add-author').value;
    var genre = document.getElementById('add-genre').value;
    var publishedYear = parseInt(document.getElementById('add-year').value);
    var bookId = libraryManager['books'].length + 1; // Auto increment ID
    libraryManager.addBook({
        title: title,
        author: author,
        genre: genre,
        publishedYear: publishedYear,
        isAvailable: true,
        id: bookId
    });
    updateBookList();
}
// Function to update a book
function updateBookInLibrary() {
    var bookId = parseInt(document.getElementById('update-id').value);
    var newAuthor = document.getElementById('update-author').value;
    if (bookId && newAuthor) {
        libraryManager.updateBook(bookId, { author: newAuthor });
        updateBookList();
    }
}
// Function to search for a book by title
function searchBookInLibrary() {
    var title = document.getElementById('search-title').value;
    libraryManager.searchBooks('title', title);
}
// Function to update the book list on the page
function updateBookList() {
    var bookListElement = document.getElementById('book-list');
    if (bookListElement) {
        bookListElement.innerHTML = ''; // Clear previous list
        libraryManager['books'].forEach(function (book) {
            var listItem = document.createElement('li');
            listItem.textContent = "".concat(book.title, " by ").concat(book.author, " (").concat(book.genre, ", ").concat(book.publishedYear, ")");
            bookListElement.appendChild(listItem);
        });
    }
}
// Save data to file
function saveLibraryData() {
    libraryManager.saveToFile('library.json');
}
// Load data from file
function loadLibraryData() {
    libraryManager.loadFromFile('library.json');
    updateBookList();
}
// Initial book list update
updateBookList();
