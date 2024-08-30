import express from "express";
import sequelize from "./config/database.js";
import Swagger from "./swagger.js";
import Task from "./routes/tasks.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());

app.use("/tasks", Task);

app.use("/api-docs", Swagger);


sequelize.sync().then(() => {
    console.log("Database connected");;
}).catch((error) => {
    console.log(error);
});




export default app;