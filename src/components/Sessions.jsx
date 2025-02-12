import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Screening from "./Screening.jsx";

export default function Sessions({ setSessionInfo, cleanState }) {
    const { movieId } = useParams();
    const [sessions, setSessions] = useState(null);

    useEffect(() => {
        axios.get("https://cineflex-back.onrender.com/movies/" + movieId + "/sessions")
            .then(res => setSessions(res.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => cleanState("session"), []);

    return (
        <Wrapper>
            <Title>Selecione a sessão</Title>
            {sessions?.map((session, i) => <Screening key={i} session={session} setSessionInfo={setSessionInfo} />)}
        </Wrapper>
    )
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
`
