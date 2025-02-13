import { useEffect, useState } from "react";
import styled from "styled-components";

import { fetchMovies } from "../utils/backend.js";
import SelectionRow from "./SelectionRow.jsx";

export default function Movies() {
    const [movies, setMovies] = useState(null);
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        function updateOpen() {
            const url = new URL(window.location);
            setOpen(url.searchParams.get("movie") == null);
        }

        updateOpen();
        window.addEventListener("onpushstate", () => updateOpen());
    }, []);

    useEffect(() => {
        fetchMovies().then(res => setMovies(res.data));
    }, []);

    function setQueryParam(movie) {
        const url = new URL(window.location);
        url.searchParams.delete("session");
        url.searchParams.delete("seats");

        if (movie == null) {
            url.searchParams.delete("movie");
        } else {
            url.searchParams.set("movie", movie);
        }

        window.history.pushState(null, "", url);
    }

    return (
        <SelectionRow title="Selecione um filme" isOpen={isOpen} setOpen={() => setQueryParam(null)}>
            {movies?.map(movie => (
                <Poster key={movie._id} onClick={() => setQueryParam(movie._id)}>
                    <Image $poster={movie.poster} />
                    <Title>{movie.title}</Title>
                </Poster>
            ))}
        </SelectionRow>
    );
}

const Title = styled.div`
    color: white;
    filter: opacity(0);
    text-align: center;
    user-select: none;

    transform: translate(-50%, -50%);
    position: absolute;
    left: 50%;
    top: 50%;
`;

const Image = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-image: url(${({ $poster }) => $poster});
    background-position: center;
    background-size: cover;
`;

const Poster = styled.div`
    width: 200px;
    aspect-ratio: 3 / 4;
    position: relative;
    flex-shrink: 0;

    &:hover {
        ${Image} {
            filter: brightness(0.6);
        }

        ${Title} {
            filter: opacity(1);
        }
    }
`;
