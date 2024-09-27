"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const library_1 = require("./library");
const models_1 = require("./models");
const library = new library_1.Library();
// Adding some books for testing
library.addBook({
    title: "1984",
    author: "George Orwell",
    genre: models_1.Genre.Fiction,
    publishedYear: 1949,
    isAvailable: true,
});
library.addBook({
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    genre: models_1.Genre.Science,
    publishedYear: 1988,
    isAvailable: true,
});
// Listing all books
library.listBooks();
// Searching for a book by title
console.log(library.searchBooks("title", "1984"));
// Updating a book
library.updateBook(1, { author: "Orwell" });
// Deleting a book
library.deleteBook(2);
// Listing all books after deletion
library.listBooks();
