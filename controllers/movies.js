import { v4 as uuidv4 } from "uuid";

let movies = [
  {
    id: "1",
    title: "Inception",
    director: "Christoper Nolan",
    release_date: "2010-07-16",
  },
  {
    id: "2",
    title: "The Irishman",
    director: "Martin Scorsese",
    release_date: "2019-09-27",
  },
];

export const getAllMovies = (req, res) => {
  res.status(200).json(movies);
};

export const getMovie = (req, res) => {
  const { id } = req.params;

  const foundMovie = movies.find((movie) => movie.id === id);

  if (!foundMovie) {
    return res.status(404).send("Movie not found");
  }
  res.status(200).json(foundMovie);
};

export const createMovie = (req, res) => {
  const { title, director, release_date } = req.body;

  if (!title || !director || !release_date) {
    return res
      .status(400)
      .send("Please fill title, director and release date fields");
  }

  const createdMovie = {
    id: uuidv4(),
    title: title,
    director: director,
    release_date: release_date,
  };
  movies.push(createdMovie);
  res
    .status(201)
    .send(`Movie with the ID of "${createdMovie.id}" is added to the movies`);
};

export const modifyMovie = (req, res) => {
  const { id } = req.params;
  const { title, director, release_date } = req.body;
  const foundMovie = movies.find((movie) => movie.id === id);

  if (!foundMovie) {
    return res
      .status(404)
      .send(`The movie with id "${id}" is not found in the database`);
  }

  if (!title && !director && !release_date) {
    return res
      .status(400)
      .send(
        `Oops! You can just modify the title or director or release date fields`
      );
  }

  if (title) {
    foundMovie.title = title;
  }
  if (director) {
    foundMovie.director = director;
  }
  if (release_date) {
    foundMovie.release_date = release_date;
  }
  res
    .status(200)
    .send(`The movie with id "${id}" has been modified successfully`);
};

export const updateMovie = (req, res) => {
  const { id } = req.params;
  const { title, director, release_date } = req.body;
  const foundMovie = movies.find((movie) => movie.id === id);

  if (!foundMovie) {
    return res
      .status(404)
      .send(`The movie with id "${id}" not found in the database`);
  }

  if (!title || !director || !release_date) {
    return res
      .status(400)
      .send(`The movie needs title, director and release date`);
  }

  foundMovie.title = title;
  foundMovie.director = director;
  foundMovie["release_date"] = release_date;

  res
    .status(200)
    .send(`The movie with id "${id}" has been updated successfully`);
};

export const deleteMovie = (req, res) => {
  const { id } = req.params;
  const foundMovie = movies.find((movie) => movie.id === id);
  if (!foundMovie) {
    return res.status(404).send(`The movie with id "${id}"
    not found in the database`);
  }
  movies = movies.filter((movie) => movie.id !== id);
  res.status(200).send(`The movie with id "${id}"
  is deleted`);
};
