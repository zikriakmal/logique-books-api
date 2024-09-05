
import { json } from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import { booksRouter } from './routes/books.route';
import rateLimit from 'express-rate-limit';
import logger from './config/logger';
import { specs, swaggerUi } from './swagger'; // Import Swagger setup

require('dotenv').config();

const port = process.env.PORT || 4000;
const app = express()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
})
app.use(limiter)
app.use(json())
app.use(booksRouter)

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
mongoose.connect(process.env.MONGODB_URI || "mongodb://test:logique123@localhost:27017", {
    dbName: 'logique',
})
    .then(() => logger.info('MongoDB connected successfully'))
    .catch(err => logger.error('MongoDB connection error:', err));
;

app.listen(port, () => {
    logger.info(`server is listening in port ${port}`)
})

