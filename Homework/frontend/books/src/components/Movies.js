import React, {useEffect, useState} from "react";
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
            </div>
            ))}
        </div>
        </div>
    );
    }

export default Movies;