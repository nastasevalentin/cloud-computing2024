import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import "./MovieDetail.css"

function MovieDetail() {
    let { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [updatedMovie, setUpdatedMovie] = useState({});
    const [reload, setReload] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:3001/movies/${id}`)
            .then((response) => {
                const movieData = response.data;
                setMovie(movieData);
                setUpdatedMovie(movieData);
            })
            .catch((error) => {
                console.error(`Error fetching data: ${error}`);
            });
    }, [id, reload]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedMovie((prevMovie) => ({
            ...prevMovie,
            [name]: name === 'year' && !isNaN(value) ? parseInt(value, 10) : value,
        }));
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        axios
            .put(`http://localhost:3001/movies/${id}`, updatedMovie)
            .then((response) => {
                console.log(response.data);
                setMovie(response.data);
                setShowPopup(false);
                setReload(!reload);
            })
            .catch((error) => {
                console.error(`Error updating data: ${error}`);
            });
    };

    if (!movie) return "Loading...";

    return (
        <div className="movie-detail-container">
            <div className="movie-detail">
                <h2>{movie.title}</h2>
                <p>{movie.director}</p>
                <p>{movie.year}</p>
                <button onClick={() => setShowPopup(true)}>Update Movie</button>
                {showPopup && (
                    <div className="popup">
                        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ margin: '10px 0' }}>
                                Title:
                                <input type="text" name="title" onChange={handleInputChange} />
                            </label>
                            <label style={{ margin: '10px 0' }}>
                                Director:
                                <input type="text" name="director" onChange={handleInputChange} />
                            </label>
                            <label style={{ margin: '10px 0' }}>
                                Year:
                                <input type="number" name="year" onChange={handleInputChange} />
                            </label>
                            <div style={{ margin: '10px 0' }}>
                                <button type="submit">Submit</button>
                                <button type="button" onClick={() => setShowPopup(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MovieDetail;