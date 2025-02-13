import { useEffect, useState } from "react";

import { fetchMovies } from "../utils/backend.js";
import NewPoster from "./NewPoster.jsx";
import SelectionRow from "./SelectionRow.jsx";

export default function Movies(props) {
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        fetchMovies().then(res => setMovies(res.data));
    }, []);

    return (
        <SelectionRow title="Selecione um filme" {...props}>
            {movies?.map(movie => (
                <NewPoster key={movie._id} {...movie} />
            ))}
        </SelectionRow>
    );
}
