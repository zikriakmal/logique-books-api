import { getAllBook, createBook, getBookById, updateBookById, deleteBookById } from "../../controller/book.controller";
import { Book } from "../../model/book.model";
import { ReqCreateBook } from "../../dto/createBook.dto";

// Mock the Book model
jest.mock("../../model/book.model");

describe('Book Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllBook', () => {
        it('should return all books', async () => {
            const mockBooks = [{ title: 'Book1' }, { title: 'Book2' }];
            (Book.find as jest.Mock).mockResolvedValue(mockBooks);

            const books = await getAllBook();

            expect(books).toEqual(mockBooks);
            expect(Book.find).toHaveBeenCalled();
        });
    });

    describe('createBook', () => {
        it('should create a new book', async () => {
            const mockBook = { title: 'New Book' };
            const req: ReqCreateBook = { title: 'New Book', author: 'Author', genres: ['Fiction'], publishedYear: 2024, stock: 10 };
            (Book.create as jest.Mock).mockResolvedValue(mockBook);

            const book = await createBook(req);

            expect(book).toEqual(mockBook);
            expect(Book.create).toHaveBeenCalledWith({
                title: req.title,
                author: req.author,
                publishedYear: req.publishedYear,
                genres: req.genres,
                stock: req.stock
            });
        });
    });

    describe('getBookById', () => {
        it('should return the book if found', async () => {
            const mockBook = { title: 'Book1' };
            (Book.findOne as jest.Mock).mockResolvedValue(mockBook);

            const book = await getBookById('some-id');

            expect(book).toEqual(mockBook);
            expect(Book.findOne).toHaveBeenCalledWith({ _id: 'some-id' });
        });

        it('should return -1 if book not found', async () => {
            (Book.findOne as jest.Mock).mockResolvedValue(null);

            const book = await getBookById('some-id');

            expect(book).toBe(-1);
        });
    });

    describe('updateBookById', () => {
        it('should update and return the book if found', async () => {
            const mockBook = { title: 'Updated Book' };
            (Book.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockBook);

            const book = await updateBookById('some-id', { title: 'Updated Book' });

            expect(book).toEqual(mockBook);
            expect(Book.findByIdAndUpdate).toHaveBeenCalledWith('some-id', { title: 'Updated Book' }, { new: true, runValidators: true });
        });

        it('should return -1 if book not found', async () => {
            (Book.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

            const book = await updateBookById('some-id', { title: 'Updated Book' });

            expect(book).toBe(-1);
        });
    });

    describe('deleteBookById', () => {
        it('should delete and return the book if found', async () => {
            const mockBook = { title: 'Book to be deleted' };
            (Book.findByIdAndDelete as jest.Mock).mockResolvedValue(mockBook);

            const book = await deleteBookById('some-id');

            expect(book).toEqual(mockBook);
            expect(Book.findByIdAndDelete).toHaveBeenCalledWith('some-id');
        });

        it('should return -1 if book not found', async () => {
            (Book.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

            const book = await deleteBookById('some-id');

            expect(book).toBe(-1);
        });
    });
});
