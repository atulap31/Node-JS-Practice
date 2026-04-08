// -------------pre-written code starts---------------
import mongoose from 'mongoose';
import { bookSchema } from './book.schema.js'

// creating model from schema.
const booksModel = mongoose.model('Book', bookSchema);

export default class BookRepository {

    //book creation
    async createBook(bookData) {
        const book = new booksModel(bookData);
        const savedBook = await book.save();
        return savedBook;
    }

    // filtering of book by id
    async getOne(id) {
        const book = await booksModel.findById(id);
        return book;
    }

    // ------------prewritten code ends----------------


    // Complete the following functions:

    //filtering the books based on genre
    async listBooksByGenre(genre) {
        try {
            // Case-insensitive genre matching
            const books = await booksModel.find({ 
                genre: { $regex: new RegExp(`^${genre}$`, 'i') } 
            });
            return books;
        } catch (error) {
            throw new Error(`Error fetching books by genre: ${error.message}`);
        }
    }

    //increasing the count of available books
    async updateBookAvailability(bookId, quantity) {
        try {
            // First find the book to check current availableCopies
            const book = await booksModel.findById(bookId);
            
            if (!book) {
                return null;
            }
            
            // Calculate new available copies
            const newAvailableCopies = book.availableCopies + quantity;
            
            // Ensure availableCopies doesn't exceed total copies
            if (newAvailableCopies > book.copies) {
                throw new Error("Available copies cannot exceed total copies");
            }
            
            // Update the book with new available copies
            const updatedBook = await booksModel.findByIdAndUpdate(
                bookId,
                { $set: { availableCopies: newAvailableCopies } },
                { new: true, runValidators: true }
            );
            
            return updatedBook;
        } catch (error) {
            throw new Error(`Error updating book availability: ${error.message}`);
        }
    }

    //deletion of book
    async deleteBookById(bookId) {
        try {
            const deletedBook = await booksModel.findByIdAndDelete(bookId);
            return deletedBook;
        } catch (error) {
            throw new Error(`Error deleting book: ${error.message}`);
        }
    }
}