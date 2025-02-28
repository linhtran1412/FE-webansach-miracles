import React from "react";
import BookProps from "./components/BookProps";
import Book from "../../models/Book";

const List: React.FC = () => {
    const books: Book[] = [
        {
            id: 1,
            title: 'Book 1',
            description: 'Description for Book 1',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../images/book/1.png.jpeg',
        },
        {
            id: 1,
            title: 'Book 1',
            description: 'Description for Book 2',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../images/book/1.png.jpeg',
        },
        {
            id: 1,
            title: 'Book 1',
            description: 'Description for Book 3',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../images/book/1.png.jpeg',
        },
        {
            id: 1,
            title: 'Book 1',
            description: 'Description for Book 1',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../images/book/1.png.jpeg',
        },
        {
            id: 1,
            title: 'Book 1',
            description: 'Description for Book 2',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../images/book/1.png.jpeg',
        },
        {
            id: 1,
            title: 'Book 1',
            description: 'Description for Book 3',
            originalPrice: 50000,
            price: 45000,
            imageUrl:'./../../../images/book/1.png.jpeg',
        },
        {
            id: 1,
            title: 'Book 1',
            description: 'Description for Book 1',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../images/book/1.png.jpeg',
        },
        {
            id: 1,
            title: 'Book 1',
            description: 'Description for Book 2',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../images/book/1.png.jpeg',
        },

    ];
    return (
        <div className="container">
            <div className="row mt-4">
                {
                    books.map((book) => (
                            <BookProps key={book.id}  book={book} />
                        )
                    )
                }
            </div>
        </div>
    );
}

export default List;