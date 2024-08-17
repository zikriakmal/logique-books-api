import Joi from 'joi';

export const createBookSchema = Joi.object({
    title: Joi.string().min(1).required(),
    author: Joi.string().min(1).required(),
    genres: Joi.array().items(Joi.string()).required(),
    publishedYear: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
    stock: Joi.number().integer().min(0).required()
});

export const updateBookSchema = Joi.object({
    title: Joi.string().min(1),
    author: Joi.string().min(1),
    genres: Joi.array().items(Joi.string()),
    publishedYear: Joi.number().integer().min(1900).max(new Date().getFullYear()),
    stock: Joi.number().integer().min(0)
}).or('title', 'author', 'genres', 'publishedYear', 'stock'); 