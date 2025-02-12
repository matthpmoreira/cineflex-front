import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { fetchSessions } from "../utils/backend.js";
import Screening from "./Screening.jsx";

export default function Sessions({ setSessionInfo, cleanState }) {
    const { movieId } = useParams();
    const [sessions, setSessions] = useState(null);

    useEffect(() => {
        fetchSessions(movieId).then(res => setSessions(res.data));
    }, [movieId]);

    useEffect(() => cleanState("session"), []);

    return (
        <Wrapper>
            <Title>Selecione a sessão</Title>
            {sessions?.map((session, i) => (
                <Screening key={i} session={session} setSessionInfo={setSessionInfo} />
            ))}
        </Wrapper>
    );
}

const Wrapper = styled.section`
    padding: 24px;
    background: #212226;
    flex: 1;
`;

const Title = styled.h2`
    margin-bottom: 1em;
    color: white;
    font-family: "Sarala", sans-serif;
    font-size: 24px;
    text-align: center;
`;
