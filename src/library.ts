// src/library.ts
import { Book, Genre } from './models';
type BookStatus = Book & { checkedOut: boolean };

export class Library {
    private books: Book[] = [];
    private nextId = 1;

    addBook(book: Omit<Book, 'id'>): Book {
        const newBook: Book = { ...book, id: this.nextId++ };
        this.books.push(newBook);
        return newBook;
    }
    // src/library.ts (add to the Library class)
    listBooks(): void {
        if (this.books.length === 0) {
            console.log("No books in the inventory.");
        } else {
            this.books.forEach(book => console.log(book));
        }
    }
    // src/library.ts (add to the Library class)
    searchBooks<K extends keyof Book>(property: K, value: Book[K]): Book[] {
        return this.books.filter(book => book[property] === value);
    }
    // src/library.ts (add to the Library class)
    updateBook(id: number, updates: Partial<Omit<Book, 'id'>>): Book | undefined {
        const book = this.books.find(b => b.id === id);
        if (book) {
            Object.assign(book, updates);
        }
        return book;
    }
    // src/library.ts (add to the Library class)
    deleteBook(id: number): boolean {
        const index = this.books.findIndex(book => book.id === id);
        if (index !== -1) {
            this.books.splice(index, 1);
            return true;
        }
        return false;
    }

}
