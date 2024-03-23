import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Movies.css";
import CreateMovie from "./CreateMovie";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [showCreateMovie, setShowCreateMovie] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [reload]);

  const deleteMovie = (id) => {
    fetch(`http://localhost:3001/movies/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setReload(!reload);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      {showCreateMovie && <CreateMovie setReload={setReload} />}
      <button
        className="button"
        onClick={() => setShowCreateMovie(!showCreateMovie)}
      >
        {showCreateMovie ? "Cancel" : "Create a Movie"}{" "}
      </button>
      <div class="movies-container">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <Link to={`/movies/${movie.id}`}>
              <h2>{movie.title}</h2>
            </Link>
            <p>{movie.director}</p>
            <button
              className="delete-button"
              onClick={() => deleteMovie(movie.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
