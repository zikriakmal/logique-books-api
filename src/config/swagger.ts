import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Books API',
        version: '1.0.0',
        description: 'API documentation for the Books API',
    },
    servers: [
        {
            url: `http://localhost:4000`, // Adjust if necessary
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, '../routes/**/*.ts')],// Adjust path as necessary for TypeScript
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };