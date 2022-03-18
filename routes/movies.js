import express from "express";
import {
  getAllMovies,
  getMovie,
  createMovie,
  modifyMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movies.js";

const router = express.Router();

router.get("/", getAllMovies);
router.get("/:id", getMovie);
router.post("/", createMovie);
router.patch("/:id", modifyMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;
