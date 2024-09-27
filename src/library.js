"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
class Library {
    constructor() {
        this.books = [];
        this.nextId = 1;
    }
    addBook(book) {
        const newBook = Object.assign(Object.assign({}, book), { id: this.nextId++ });
        this.books.push(newBook);
        return newBook;
    }
    // src/library.ts (add to the Library class)
    listBooks() {
        if (this.books.length === 0) {
            console.log("No books in the inventory.");
        }
        else {
            this.books.forEach(book => console.log(book));
        }
    }
    // src/library.ts (add to the Library class)
    searchBooks(property, value) {
        return this.books.filter(book => book[property] === value);
    }
    // src/library.ts (add to the Library class)
    updateBook(id, updates) {
        const book = this.books.find(b => b.id === id);
        if (book) {
            Object.assign(book, updates);
        }
        return book;
    }
    // src/library.ts (add to the Library class)
    deleteBook(id) {
        const index = this.books.findIndex(book => book.id === id);
        if (index !== -1) {
            this.books.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.Library = Library;
