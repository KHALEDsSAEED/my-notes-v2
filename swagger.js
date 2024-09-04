import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger definition for the API documentation
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
                url: 'https://my-notes-v2.onrender.com', // Updated server URL
                description: 'Production server',
            },
        ],
    },
    // Path to the API routes and models
    apis: ['./server/routes/*.js', './server/models/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Export the swagger documentation 
export default (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
