import express from "express";
import sequelize from "./config/database.js";
import swaggerMiddleware from "./swagger.js";
import Task from "./routes/tasks.js";
import dotenv from "dotenv";
import cors from "cors"; // Importar el middleware cors

const [swaggerUi, swaggerJsdoc] = swaggerMiddleware;

dotenv.config();

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', // Reemplaza con el origen que deseas permitir
    optionsSuccessStatus: 200 // Algunas versiones antiguas de navegadores (IE11, algunos SmartTVs) fallan con 204
};

app.use(cors(corsOptions)); // Usar el middleware cors
app.use(express.json());

app.use("/tasks", Task);

app.use("/api-docs", ...swaggerMiddleware);

sequelize.sync().then(() => {
    console.log("Database connected");
}).catch((error) => {
    console.log(error);
});

export default app;