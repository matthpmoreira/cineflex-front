import styled from "styled-components";

import Movies from "./Movies.jsx";
import NewSessions from "./NewSessions.jsx";

export default function StackedSelection() {
    return (
        <Container>
            <Movies />
            <NewSessions />
        </Container>
    );
}

const Container = styled.div`
    width: min(100%, 1000px);
    padding: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    gap: 10px;
`;
