"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
var Library = /** @class */ (function () {
    function Library() {
        this.books = [];
        this.nextId = 1;
    }
    Library.prototype.addBook = function (book) {
        var newBook = __assign(__assign({}, book), { id: this.nextId++ });
        this.books.push(newBook);
        return newBook;
    };
    // src/library.ts (add to the Library class)
    Library.prototype.listBooks = function () {
        if (this.books.length === 0) {
            console.log("No books in the inventory.");
        }
        else {
            this.books.forEach(function (book) { return console.log(book); });
        }
    };
    // src/library.ts (add to the Library class)
    Library.prototype.searchBooks = function (property, value) {
        return this.books.filter(function (book) { return book[property] === value; });
    };
    // src/library.ts (add to the Library class)
    Library.prototype.updateBook = function (id, updates) {
        var book = this.books.find(function (b) { return b.id === id; });
        if (book) {
            Object.assign(book, updates);
        }
        return book;
    };
    // src/library.ts (add to the Library class)
    Library.prototype.deleteBook = function (id) {
        var index = this.books.findIndex(function (book) { return book.id === id; });
        if (index !== -1) {
            this.books.splice(index, 1);
            return true;
        }
        return false;
    };
    return Library;
}());
exports.Library = Library;
