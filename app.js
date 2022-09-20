require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.APP_PORT ?? 5000;


const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};
app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const usersHandlers = require("./usersHandlers");
const validateMovie = require("./validators");
const validateUser = require("./validators.js");
const { hashPassword, verifyPassword, verifyToken } = require("./auth.js");

//app.post("/api/movies", verifyToken, movieHandlers.postMovie);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);
app.post("/api/login", usersHandlers.getUserByEmailWithPasswordAndPassToNext, verifyPassword);
app.post("/api/users", hashPassword, usersHandlers.postUsers);

app.use(verifyToken);
app.post("/api/movies",verifyToken, movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovies);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", usersHandlers.deleteUsers);
app.put("/api/users/:id",  usersHandlers.updateUsers);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

const isItDwight = (req, res) => {
  if (req.body.email === "dwight@theoffice.com" && req.body.password === "123456") {
    res.send("Credentials are valid");
  } else {
    res.sendStatus(401);
  }
};

app.post("/api/login", isItDwight);

