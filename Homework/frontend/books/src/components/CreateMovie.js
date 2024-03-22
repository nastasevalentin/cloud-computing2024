import React, {useState} from "react";
import "./Form.css";

const CreateMovie = ({setReload}) => {
    const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
    const [year, setYear] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("http://localhost:3001/movies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    director,
                    year,
                }),
            });
            
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error:", error);
        }
        setReload((reload) => !reload);
    };
    
    return (
        <form onSubmit={handleSubmit} className="form">
        <label>
            Title:
            <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
        </label>
        <label>
            Director:
            <input
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            />
        </label>
        <label>
            Year:
            <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            />
        </label>
        
        <button type="submit">Create Movie</button>
        </form>
    );
}

export default CreateMovie;