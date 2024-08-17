import mongoose from 'mongoose';

interface IBook {
    title: string,
    author: string,
    publishedYear: number,
    genres: Array<string>,
    stock: number,
    createdAt?: Date,
    updatedAt?: Date,
}

interface bookModelInterface extends mongoose.Model<IBook> {
    build(attr: IBook): any
}

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishedYear: {
        type: Number,
        required: true,
    },
    genres: {
        type: Array<String>,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})

const Book = mongoose.model<any, bookModelInterface>('books', bookSchema)

export { Book }