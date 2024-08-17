import express, { NextFunction, Request, Response } from "express";
import { createBook, deleteBookById, getAllBook, getBookById, updateBookById } from "../controller/book.controller";
import { responseWrapper } from "../helpers/responseWrapper";
import validationSchema from "../middlewares/validationSchema";
import { createBookSchema, updateBookSchema } from "../validators/book.validator";

const router = express.Router()

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       author:
 *                         type: string
 *                       genres:
 *                         type: array
 *                         items:
 *                           type: string
 *                       publishedYear:
 *                         type: integer
 *                       stock:
 *                         type: integer
 */
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

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *               publishedYear:
 *                 type: integer
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     author:
 *                       type: string
 *                     genres:
 *                       type: array
 *                       items:
 *                         type: string
 *                     publishedYear:
 *                       type: integer
 *                     stock:
 *                       type: integer
 */
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

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the book
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     author:
 *                       type: string
 *                     genres:
 *                       type: array
 *                       items:
 *                         type: string
 *                     publishedYear:
 *                       type: integer
 *                     stock:
 *                       type: integer
 *       404:
 *         description: Book not found
 */
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

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the book
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *               publishedYear:
 *                 type: integer
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     author:
 *                       type: string
 *                     genres:
 *                       type: array
 *                       items:
 *                         type: string
 *                     publishedYear:
 *                       type: integer
 *                     stock:
 *                       type: integer
 *       404:
 *         description: Book not found
 */
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


/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the book
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     author:
 *                       type: string
 *                     genres:
 *                       type: array
 *                       items:
 *                         type: string
 *                     publishedYear:
 *                       type: integer
 *                     stock:
 *                       type: integer
 *       404:
 *         description: Book not found
 */
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
