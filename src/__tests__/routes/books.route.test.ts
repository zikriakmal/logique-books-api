import request from 'supertest';
import express from 'express';
import { booksRouter } from '../../routes/books.route';
import { Book } from '../../model/book.model';

// Create an instance of the Express application
const app = express();
app.use(express.json());
app.use('/api', booksRouter);

// Mock the Book model
jest.mock('../../model/book.model');

describe('Books API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/books', () => {
        it('should return a list of books', async () => {
            const mockBooks = [{ title: 'Book1' }, { title: 'Book2' }];
            (Book.find as jest.Mock).mockResolvedValue(mockBooks);

            const response = await request(app).get('/api/books');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                success: true,
                message: 'success get all book',
                data: mockBooks,
            });
        });
    });

    describe('POST /api/books', () => {
        it('should create a new book', async () => {
            const reqBody = { title: 'New Book', author: 'Author', genres: ['Fiction'], publishedYear: 2024, stock: 10 };
            const mockBook = { ...reqBody, _id: '12345' };
            (Book.create as jest.Mock).mockResolvedValue(mockBook);

            const response = await request(app).post('/api/books').send(reqBody);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                success: true,
                message: 'success create book',
                data: mockBook,
            });
        });
    });

    describe('GET /api/books/:id', () => {
        it('should return a book if found', async () => {
            const mockBook = { title: 'Book1', _id: '12345' };
            (Book.findOne as jest.Mock).mockResolvedValue(mockBook);

            const response = await request(app).get('/api/books/12345');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                success: true,
                message: 'success get book by id',
                data: mockBook,
            });
        });

        it('should return 404 if book not found', async () => {
            (Book.findOne as jest.Mock).mockResolvedValue(null);

            const response = await request(app).get('/api/books/12345');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({
                success: false,
                message: 'not found',
            });
        });
    });

    describe('PUT /api/books/:id', () => {
        it('should update and return the book if found', async () => {
            const mockBook = { title: 'Updated Book', _id: '12345' };
            (Book.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockBook);

            const response = await request(app).put('/api/books/12345').send({ title: 'Updated Book' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                success: true,
                message: 'success update book by id',
                data: mockBook,
            });
        });

        it('should return 404 if book not found', async () => {
            (Book.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

            const response = await request(app).put('/api/books/12345').send({ title: 'Updated Book' });

            expect(response.status).toBe(404);
            expect(response.body).toEqual({
                success: false,
                message: 'not found',
            });
        });
    });

    describe('DELETE /api/books/:id', () => {
        it('should delete and return the book if found', async () => {
            const mockBook = { title: 'Book to be deleted', _id: '12345' };
            (Book.findByIdAndDelete as jest.Mock).mockResolvedValue(mockBook);

            const response = await request(app).delete('/api/books/12345');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                success: true,
                message: 'success delete book by id',
                data: mockBook,
            });
        });

        it('should return 404 if book not found', async () => {
            (Book.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

            const response = await request(app).delete('/api/books/12345');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({
                success: false,
                message: 'not found',
            });
        });
    });
});