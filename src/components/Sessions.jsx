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
            {sessions?.map(session => (
                <div key={session.id} onClick={() => setQueryParam(session.id)}>
                    {session.date.toString()}
                </div>
            ))}
        </>
    );
}

const Session = styled.div``;
