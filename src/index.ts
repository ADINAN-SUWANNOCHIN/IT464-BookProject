// อดินันท์ สุวรรณโณชิน 1650708017

// สร้าง Enum ไว้เก็บ Genre
enum Genre {
    Fiction = "Fiction",
    NonFiction = "Non-Fiction",
    Science = "Science",
    History = "History",
    Action = "Action",
    Comedy = "Comedy",
    Thriller = "Thriller",
    Romance = "Romance",
    Drama = "Drama",
    SuperHero = "SuperHero",
    Horror = "Horror"
}

// สร้าง interface ชื่อ Book กำหนด โดยกำหนด type ต่างๆ 
interface Book {
    title: string;
    author: string;
    genre: Genre; // ใช้ Enum ที่สร้างขึ้น
    publishedYear: number;
    isAvailable: boolean;
    id: number;
}

// ประกาศให้ฟังก์ชั่นglobal
(window as any).addBookToLibrary = addBookToLibrary;
(window as any).updateBookInLibrary = updateBookInLibrary;
(window as any).searchBookInLibrary = searchBookInLibrary;
(window as any).saveLibraryData = saveLibraryData;
(window as any).loadLibraryData = loadLibraryData;


// สร้าง class ชื่อ Library ใช้จัดการหนังสือ(ไว้ใส่ฟังก์ชั่น)
class Library {
    private books: Book[] = [];

    addBook(book: Book): void {
        this.books.push(book);
        console.log(`${book.title} added to library.`);
    }

    listBooks(): void {
        console.log("List of books in the library:");
        this.books.forEach(book => console.log(`- ${book.title} by ${book.author} (${book.genre}, ${book.publishedYear})`));
    }

    searchBooks(field: keyof Book, value: string | number): void {
        const results = this.books.filter(book => book[field] === value);
        if (results.length > 0) {
            console.log(`Found: ${results[0].title} by ${results[0].author}`);
        } else {
            console.log("No book found with the given criteria.");
        }
    }

    updateBook(id: number, updatedFields: Partial<Book>): void {
        const book = this.books.find(b => b.id === id);
        if (book) {
            Object.assign(book, updatedFields);
            console.log(`Book with id ${id} updated to: ${JSON.stringify(book)}`);
        } else {
            console.log(`Book with id ${id} not found for update.`);
        }
    }

    deleteBook(id: number): void {
        const initialLength = this.books.length;
        this.books = this.books.filter(book => book.id !== id);
        if (this.books.length < initialLength) {
            console.log(`Book with id ${id} deleted.`);
        } else {
            console.log(`Book with id ${id} not found for deletion.`);
        }
    }

   //  เซฟที่ localStorage แทน
    saveToFile(filePath: string): void {
        localStorage.setItem('libraryData', JSON.stringify(this.books));
        console.log(`Library data saved to localStorage.`);
    }

    // โหลกจาก local storage
    loadFromFile(filePath: string): void {
        const data = localStorage.getItem('libraryData');
        if (data) {
            this.books = JSON.parse(data);
            console.log(`Library data loaded from localStorage.`);
            this.listBooks(); // Display loaded books
        } else {
            console.log("No saved data found in localStorage.");
        }
    }

    
}

// สร้างตัวอย่างของ Library และใช้งานฟังก์ชัน
const libraryManager = new Library();

function addBookToLibrary() {
    const title = (document.getElementById('add-title') as HTMLInputElement).value;
    const author = (document.getElementById('add-author') as HTMLInputElement).value;
    const genre = (document.getElementById('add-genre') as HTMLSelectElement).value as Genre;
    const publishedYear = parseInt((document.getElementById('add-year') as HTMLInputElement).value);

    const bookId = libraryManager['books'].length + 1; // Auto increment ID

    libraryManager.addBook({
        title,
        author,
        genre,
        publishedYear,
        isAvailable: true,
        id: bookId
    });

    updateBookList();
}

function updateBookInLibrary() {
    const bookId = parseInt((document.getElementById('update-id') as HTMLInputElement).value);
    const newAuthor = (document.getElementById('update-author') as HTMLInputElement).value;

    if (bookId && newAuthor) {
        libraryManager.updateBook(bookId, { author: newAuthor });
        updateBookList();
    }
}

function searchBookInLibrary() {
    const title = (document.getElementById('search-title') as HTMLInputElement).value;
    libraryManager.searchBooks('title', title);
}

function updateBookList() {
    const bookListElement = document.getElementById('book-list');
    if (bookListElement) {
        bookListElement.innerHTML = '';
        libraryManager['books'].forEach(book => {
            const listItem = document.createElement('li');
            listItem.textContent = `${book.title} by ${book.author} (${book.genre}, ${book.publishedYear})`;
            bookListElement.appendChild(listItem);
        });
    }
}


function saveLibraryData() {
    libraryManager.saveToFile('library.json');
}


function loadLibraryData() {
    libraryManager.loadFromFile('library.json');
    updateBookList();
}

// แสดงผลคลังหนังสือ
updateBookList();

