// import app from "./app.js";
import e from "express";
const app = e();

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})


