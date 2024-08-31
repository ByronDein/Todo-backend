import express from "express";
import sequelize from "./config/database.js";
import swaggerMiddleware from "./swagger.js";
import Task from "./routes/tasks.js";
import dotenv from "dotenv";

const [swaggerUi, swaggerJsdoc] = swaggerMiddleware;

dotenv.config();

const app = express();

app.use(express.json());

app.use("/tasks", Task);

app.use("/api-docs",...swaggerMiddleware);

sequelize.sync().then(() => {
    console.log("Database connected");
}).catch((error) => {
    console.log(error);
});

export default app;