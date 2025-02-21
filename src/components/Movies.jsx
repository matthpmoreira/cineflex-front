import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "wouter";

import { getAllMovies } from "../utils/api.js";
import { GlowingBorder } from "./GlowingBorder.jsx";
import { Button } from "./Button.jsx";

export default function Movies() {
    const [movies, setMovies] = useState(null);
    const [selected, setSelected] = useState(null);
    const [_, setSearchParams] = useSearchParams();

    useEffect(() => {
        getAllMovies().then(movies => setMovies(movies));
    }, []);

    return (
        <div>
            <H1>Selecione um filme</H1>
            <MovieList>
                {movies?.map(movie => (
                    <Poster key={movie.id} data={movie} setSelected={setSelected} selected={selected === movie.id} />
                ))}
            </MovieList>
            <Button onClick={() => setSearchParams({ movie: selected })}>Confirmar</Button>
        </div>
    );
}

function Poster({ data, setSelected, selected }) {
    return (
        <PosterContainer
            key={data.id}
            onClick={() => setSelected(data.id)}
        >
            {selected ?
                <GlowingBorder borderWidth={6}>
                    <ImageContainer>
                        <Image $src={data.poster} />
                    </ImageContainer>
                </GlowingBorder>
            :   <ImageContainer>
                    <Image $src={data.poster} />
                </ImageContainer>
            }
            <Title>{data.title}</Title>
        </PosterContainer>
    );
}

const H1 = styled.h1`
    color: white;
`;

const MovieList = styled.div`
    display: flex;
    justify-content: safe center;
    overflow-x: scroll;
`;

const PosterContainer = styled.div`
    width: 200px;
    margin: 0 -6px;
    flex-shrink: 0;
`;

const ImageContainer = styled.div`
    padding: 12px;
    aspect-ratio: 3 / 4;
`;

const Image = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 2px;
    background-image: url(${props => props.$src});
    background-position: center;
    background-size: cover;
`;

const Title = styled.div`
    color: white;
    text-align: center;
    text-wrap: balance;
    user-select: none;
`;
