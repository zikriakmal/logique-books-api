import { ReqCreateBook } from "../dto/createBook.dto";
import { ReqUpdateBook } from "../dto/updateBook.dto";
import { Book } from "../model/book.model";

const getAllBook = async () => {
    const books = await Book.find();
    return books
}

const createBook = async (req: ReqCreateBook) => {
    const book = await Book.create({
        title: req.title,
        author: req.author,
        publishedYear: req.publishedYear,
        genres: req.genres,
        stock: req.stock
    })
    return book;
}

const getBookById = async (id: string) => {
    const book = await Book.findOne({ _id: id });
    if (!book) return -1;
    return book
}

const updateBookById = async (id: string, updateData: ReqUpdateBook) => {
    const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });

    if (!updatedBook) return -1;

    return updatedBook;
}

const deleteBookById = async (id: string) => {
    const deleteBook = await Book.findByIdAndDelete(id);

    if (!deleteBook) return -1

    return deleteBook
}

export { createBook, deleteBookById, getAllBook, getBookById, updateBookById };
