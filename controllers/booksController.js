import { BadRequestError } from "../errors/index.js";
import Book from "../models/Book.js";
import { StatusCodes } from "http-status-codes";

const getAllBooks = async (req, res) => {
    const allBooks = await Book.find({});
    res.status(StatusCodes.OK).json({ totalBooks: allBooks.length, allBooks });
};
const createBook = async (req, res) => {
    const { title, isbn, price, author } = req.body;

    if (!title || !isbn || !price || !author) {
        throw new BadRequestError("Please provide all values");
    }

    req.body.createdBy = req.user.userId;

    const book = await Book.create(req.body);

    res.status(StatusCodes.CREATED).json({
        msg: "Book created successfully!",
        book,
    });
};
const updateBook = async (req, res) => {
    const { id: bookId } = req.params;
    const { title, isbn, price, author } = req.body;

    if (!title || !isbn || !price || !author) {
        throw new BadRequestError("Please provide all values");
    }

    const bookExists = await Book.findOne({ _id: bookId });

    if (!bookExists) {
        throw new BadRequestError(`No book found with ID ${bookId}`);
    }

    const book = await Book.findByIdAndUpdate(bookId, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(StatusCodes.CREATED).json({
        msg: "Book updated successfully!",
        book,
    });
};
const deleteBook = async (req, res) => {
    const { id: bookId } = req.params;

    const bookExists = await Book.findOne({ _id: bookId });

    if (!bookExists) {
        throw new BadRequestError(`No book found with ID ${bookId}`);
    }

    await bookExists.remove();

    res.status(StatusCodes.CREATED).json({
        msg: "Book deleted successfully!",
    });
    //
};

export { getAllBooks, createBook, updateBook, deleteBook };
