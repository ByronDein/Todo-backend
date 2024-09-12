import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Todo API',
            version: '1.0.0',
            description: 'A simple CRUD API for tasks',
        },
        servers: [
            {
                url: 'https://todo-list-api.azurewebsites.net/',
            },
        ],
    },
    apis: [join(__dirname, './routes/*.js')], // Archivos donde están definidas las rutas
};

const specs = swaggerJsdoc(options);

const swaggerMiddleware = [swaggerUi.serve, swaggerUi.setup(specs)];

export default swaggerMiddleware;