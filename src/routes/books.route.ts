import express, { NextFunction, Request, Response } from "express";
import { createBook, deleteBookById, getAllBook, getBookById, updateBookById } from "../controller/book.controller";
import { responseWrapper } from "../helpers/responseWrapper";
import validationSchema from "../middlewares/validationSchema";
import { createBookSchema, updateBookSchema } from "../validators/book.validator";

const router = express.Router()

router.get('/books', async (req: Request, res: Response, next: NextFunction) => {
    const books = await getAllBook();
    try {
        res.status(200).json(responseWrapper({
            message: "success get all book",
            data: books
        }));
    } catch (err) {
        next(err)
    }
})

router.post('/books', validationSchema(createBookSchema), async (req: Request, res: Response, next: NextFunction) => {
    const { title, author, genres, publishedYear, stock } = req.body;
    try {
        const book = await createBook({
            title: title,
            author: author,
            genres: genres,
            publishedYear: publishedYear,
            stock: stock
        })
        res.status(200).json(responseWrapper({
            message: "success create book", data: book
        }));
    } catch (err) {
        next(err)
    }
})

router.get('/books/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await getBookById(req.params?.id)
        if (book === -1) {
            return res.status(404).json({
                success: false,
                message: "not found"
            })
        }
        res.status(200).json(responseWrapper({
            message: "success get book by id", data: book
        }));
    } catch (err) {
        next(err)
    }
})

router.put('/books/:id', validationSchema(updateBookSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await updateBookById(req.params?.id, req.body);
        if (book === -1) {
            return res.status(404).json({
                success: false,
                message: "not found"
            })
        }
        res.status(200).json(responseWrapper({
            message: "success update book by id", data: book
        }));
    } catch (err) {
        next(err)
    }
})

router.delete('/books/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await deleteBookById(req.params?.id);
        if (book === -1) {
            return res.status(404).json({
                success: false,
                message: "not found"
            })
        }
        res.status(200).json(responseWrapper({
            message: "success delete book by id", data: book
        }));
    } catch (err) {
        next(err)
    }
})

export { router as booksRouter };
