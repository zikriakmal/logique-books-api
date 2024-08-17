// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Books API',
        version: '1.0.0',
        description: 'A simple Express Books API',
    },
    servers: [
        {
            url: 'http://localhost:4000', // Update this to your server URL
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };