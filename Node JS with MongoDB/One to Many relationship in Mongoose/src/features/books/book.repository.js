// No need to change prewritten code

// -----------pre-written code starts--------------------

import mongoose from 'mongoose';
import { bookSchema } from './book.schema.js'
import { reviewSchema } from './review.schema.js';

// creating model from schema.
const booksModel = mongoose.model('Book', bookSchema);

// creating model for review.
const reviewModel = mongoose.model('Review', reviewSchema);

export default class BookRepository {
    async createBook(bookData) {
        const book = new booksModel(bookData);
        const savedBook = await book.save();
        return savedBook;
    }

    
    async getOne(id) {
        const book = await booksModel.findById(id);
        return book;
    }
    
    async listBooksByGenre(genre) {
        const books = await booksModel.find({ genre });
        return books;
    }
    
    async updateBookAvailability(bookId, quantity) {
        
        console.log(bookId);
        const book = await booksModel.findById(bookId);
        
        // Calculate the new availableCopies value
        const newAvailableCopies = book.availableCopies + quantity;
        
        // Update the availableCopies field and save the book
        book.availableCopies = newAvailableCopies;
        
        await book.save();
        return book;
    }

    async deleteBookById(bookId) {
        const deletedBook = await booksModel.findByIdAndRemove(bookId);
        return deletedBook;
    }

    //------------------pre-written code ends--------------------------

    // Complete the function below
    
    // adding review to a particular book
    async addReviewToBook(bookId, text, rating) {
        // Create a new review document
        const review = new reviewModel({
            text: text,
            rating: rating,
            book: bookId
        });
        
        // Save the review
        const savedReview = await review.save();
        
        // Add the review reference to the book's reviews array
        const book = await booksModel.findById(bookId);
        if (!book) {
            throw new Error('Book not found');
        }
        
        book.reviews.push(savedReview._id);
        await book.save();
        
        // Return the saved review with populated book information (optional)
        return await reviewModel.findById(savedReview._id).populate('book');
    }
}