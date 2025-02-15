import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "wouter";

import { fetchMovies } from "../utils/backend.js";

export default function Movies() {
    const [_, setSearchParams] = useSearchParams();
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        fetchMovies().then(res => setMovies(res.data));
    }, []);

    function setQueryParam(id) {
        setSearchParams({ movie: id });
    }

    return (
        <Container>
            {movies?.map(movie => (
                <Poster key={movie._id} onClick={() => setQueryParam(movie._id)}>
                    <Image $poster={movie.poster} />
                    <Title>{movie.title}</Title>
                </Poster>
            ))}
        </Container>
    );
}

const Container = styled.div`
    overflow-x: scroll;

    display: flex;
    justify-content: safe center;
    gap: 1rem;
`;

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
