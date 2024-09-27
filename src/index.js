// สร้างclassชื่อLibraryใช้จัดการหนังสือ
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
        this.books.forEach(function (book) { return console.log("- ".concat(book.title, " by ").concat(book.author)); });
    };
    Library.prototype.searchBooks = function (field, value) {
        var results = this.books.filter(function (book) { return book[field] === value; });
        if (results.length > 0) {
            console.log("Found: ".concat(results[0].title, " by ").concat(results[0].author));
        }
        else {
            console.log("No book found with the given title.");
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
    // สร้างฟังกืชั่นไว้ทดสอบระบบ
    Library.prototype.testLibrary = function () {
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
        var updatedBook = this.searchBooks("id", 1);
        // ลบหนังสือ
        console.log("Delete a book from the library:");
        this.deleteBook(2);
        console.log("Current books in library after deletion:");
        this.listBooks();
        // ลบหนังสือที่ไม่อยู่ในลิสต์
        console.log("Delete a non-existent book:");
        var bookIdToDelete = 999;
        this.deleteBook(bookIdToDelete);
    };
    return Library;
}());
// สร้างตัวอย่างของLibraryและเรียกฟังก์ชันทดสอบ
var libraryTest = new Library();
libraryTest.testLibrary();
