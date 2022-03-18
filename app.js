import express from "express";
import moviesRoutes from "./routes/movies.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/movie", moviesRoutes);

export default app;
