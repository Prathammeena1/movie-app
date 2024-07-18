import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWViYTZlMDUxZjU4YjUyODhhMjE4NjI1YWIyMzQ3YyIsIm5iZiI6MTcyMTIyMjY4OS4yMjg3NjksInN1YiI6IjY2OTdjNGE0MDE4YWE5MmQxZTIyZTU5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fezl-R_DFZdvnJSN4OVlk3GK2qtW31zjxgWV-psAKwA",
  },
});

export default instance;
