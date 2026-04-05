import mongoose from 'mongoose';
import { bookSchema } from './book.schema.js'

const Book = mongoose.model('Book', bookSchema);

export default class BookRepository {

    // -----Change code in below functions only-----

    //book creation
    async createBook(bookData) {
        try {
            const newBook = new Book(bookData);
            await newBook.save();
            return newBook;
        } catch (error) {
            throw new Error(`Error creating book: ${error.message}`);
        }
    }

    //filtering the book by id
    async getOne(id) {
        try {
            // Validate if the id is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return null;
            }
            
            const book = await Book.findById(id);
            return book;
        } catch (error) {
            throw new Error(`Error fetching book: ${error.message}`);
        }
    }
}