import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "wouter";

import { getMovieById, getSessionById } from "../utils/api.js";
import { GlowingBorder } from "./GlowingBorder.jsx";
import { Button } from "./Button.jsx";

export default function Sessions() {
    const [sessions, setSessions] = useState(null);
    const [selected, setSelected] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const movieId = searchParams.get("movie");

    useEffect(() => {
        getMovieById(movieId)
            .then(movie => Promise.all(movie.sessions.map(id => getSessionById(id))))
            .then(sessions => setSessions(sessions));
    }, [movieId]);

    return (
        <div>
            <H1>Selecione uma sessão</H1>
            {sessions?.map(session => {
                return <Session key={session.id} data={session} setSelected={setSelected} selected={selected === session.id} />;
            })}
            <Button onClick={() => setSearchParams({ movie: movieId, session: selected })}>Confirmar</Button>
        </div>
    );
}

function Session({ data, setSelected, selected }) {
    const information = useMemo(() => {
        const date = new Date(data.date);

        return (
            <InfoContainer>
                <Info>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} às ${date.getHours()}:${date.getMinutes()}`}</Info>
            </InfoContainer>
        );
    }, [data.date]);

    return (
        <SessionContainer
            onClick={() => setSelected(data.id)}
        >
            {selected ?
                <GlowingBorder borderWidth={6}>{information}</GlowingBorder>
            :   information}
        </SessionContainer>
    );
}

const H1 = styled.h1`
    color: white;
`;

const SessionContainer = styled.div`
    width: min(300px, 100%);
    margin: auto;
`;

const InfoContainer = styled.div`
    padding: 12px;
`;

const Info = styled.div`
    padding: 0.5rem;
    background: lightgray;
    border-radius: 2px;
    user-select: none;

    text-align: center;
`;
