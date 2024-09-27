"use strict";
// สร้างclassชื่อLibraryใช้จัดการหนังสือ
class Library {
    constructor() {
        this.books = [];
    }
    addBook(book) {
        this.books.push(book);
        console.log(`${book.title} added to library.`);
    }
    listBooks() {
        console.log("List of books in the library:");
        this.books.forEach(book => console.log(`- ${book.title} by ${book.author}`));
    }
    searchBooks(field, value) {
        const results = this.books.filter(book => book[field] === value);
        if (results.length > 0) {
            console.log(`Found: ${results[0].title} by ${results[0].author}`);
        }
        else {
            console.log("No book found with the given title.");
        }
    }
    updateBook(id, updatedFields) {
        const book = this.books.find(b => b.id === id);
        if (book) {
            Object.assign(book, updatedFields);
            console.log(`Book with id ${id} updated to: ${JSON.stringify(book)}`);
        }
        else {
            console.log(`Book with id ${id} not found for update.`);
        }
    }
    deleteBook(id) {
        const initialLength = this.books.length;
        this.books = this.books.filter(book => book.id !== id);
        if (this.books.length < initialLength) {
            console.log(`Book with id ${id} deleted.`);
        }
        else {
            console.log(`Book with id ${id} not found for deletion.`);
        }
    }
    // สร้างฟังกืชั่นไว้ทดสอบระบบ
    testLibrary() {
        // เพิ่มหนังสือ
        this.addBook({ title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", publishedYear: 1960, isAvailable: true, id: 3 });
        this.addBook({ title: "1984", author: "George Orwell", genre: "Fiction", publishedYear: 1949, isAvailable: true, id: 1 });
        this.addBook({ title: "A Brief History of Time", author: "Stephen Hawking", genre: "Science", publishedYear: 1988, isAvailable: true, id: 2 });
        // แสดงหนังสือทั้งหมด
        this.listBooks();
        // ค้นหาหนังสือ
        console.log("Search for a book by title:");
        this.searchBooks("title", "1984");
        // อัปเดตข้อมูลผู้แต่ง
        console.log("Update a book's author:");
        this.updateBook(1, { author: "Orwell" });
        const updatedBook = this.searchBooks("id", 1);
        // ลบหนังสือ
        console.log("Delete a book from the library:");
        this.deleteBook(2);
        console.log("Current books in library after deletion:");
        this.listBooks();
        // ลบหนังสือที่ไม่อยู่ในลิสต์
        console.log("Delete a non-existent book:");
        const bookIdToDelete = 999;
        this.deleteBook(bookIdToDelete);
    }
}
// สร้างตัวอย่างของLibraryและเรียกฟังก์ชันทดสอบ
const libraryTest = new Library();
libraryTest.testLibrary();
