import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "wouter";

import { getMovieById, getSessionById } from "../utils/api.js";

export default function Sessions() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sessions, setSessions] = useState(null);
    const movieId = searchParams.get("movie");

    useEffect(() => {
        getMovieById(movieId)
            .then(movie => Promise.all(movie.sessions.map(id => getSessionById(id))))
            .then(sessions => setSessions(sessions));
    }, [movieId]);

    function setQueryParam(id) {
        setSearchParams({ movie: movieId, session: id });
    }

    return (
        <>
            {sessions?.map(session => {
                const date = new Date(session.date);

                return (
                <Session key={session.id} onClick={() => setQueryParam(session.id)}>
                    {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} às ${date.getHours()}:${date.getMinutes()}`}
                </Session>
            )})}
        </>
    );
}

const Session = styled.div`
    margin: 10px;
    padding: 1rem;
    background: lightgray;
    border-radius: 9999px;
    user-select: none;
    
    font-family: sans-serif;
`;
