import { useState } from "react";
import styled from "styled-components";

import Movies from "./Movies.jsx";

export default function StackedSelection() {
    const [isOpen, setOpen] = useState({
        movies: false,
    });

    return (
        <Container>
            <Movies isOpen={isOpen.movies} setOpen={movies => setOpen({ ...isOpen, movies })} />
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
