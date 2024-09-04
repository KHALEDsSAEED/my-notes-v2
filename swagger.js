// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My Notes API',
            version: '1.0.0',
            description: 'API documentation for the My Notes application',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server',
            },
        ],
    },
    apis: ['./server/routes/*.js', './server/models/*.js'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);


export default (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
