// src/models.ts
export enum Genre {
    Fiction = "Fiction",
    NonFiction = "Non-Fiction",
    Science = "Science",
    History = "History",
    Mystery = "Mystery"
}

export interface Book {
    id: number;
    title: string;
    author: string;
    genre: Genre;
    publishedYear: number;
    isAvailable: boolean;
}
