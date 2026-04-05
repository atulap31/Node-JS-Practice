import mongoose from "mongoose";
import BookRepository from "./book.repository.js";

export default class BookController {
  constructor() {
    this.bookRepository = new BookRepository();
  }

  //------change code in below functions only--------

  // creation of book
  createBook = async (req, res) => {
    try {
      const bookData = req.body;

      // Ensure availableCopies is set
      if (!bookData.availableCopies) {
        bookData.availableCopies = bookData.copies;
      }

      const newBook = await this.bookRepository.createBook(bookData);

      res.status(201).json(newBook); // ✅ FIXED
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  // filtering of book by id
  getOne = async (req, res) => {
    try {
      const id = req.params.id || req.params.bookId;

      const book = await this.bookRepository.getOne(id);

      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
