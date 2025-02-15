import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "wouter";

import { fetchSeats } from "../utils/backend.js";

export default function Seats() {
    const [searchParams, setSearchParams] = useSearchParams();
    const seatNumbers = (searchParams.get("seats") || null)?.split(" ").map(Number) ?? [];
    const sessionId = searchParams.get("session");
    const movieId = searchParams.get("movie");

    const [seats, setSeats] = useState(null);
    const [selected, setSelected] = useState(new Set(seatNumbers));
    setSearchParams({ movie: movieId, session: sessionId, seats: [...selected].join(" ") });

    useEffect(() => {
        fetchSeats(movieId, sessionId).then(res => setSeats(res.data));
    }, [movieId, sessionId]);

    function toggleSeat(id, number, taken) {
        if (taken) {
            return () => alert("Esse assento não está disponível");
        }

        return () => {
            !selected.delete(number) && selected.add(number);
            setSelected(selected);
        };
    }

    return (
        <Container>
            <Grid>
                {seats?.map(({ _id, number, taken }) => (
                    <Seat
                        key={_id}
                        $taken={taken}
                        $selected={selected.has(number)}
                        onClick={toggleSeat(_id, number, taken)}
                    >
                        {number}
                    </Seat>
                ))}
            </Grid>
            <Button onClick={() => setSearchParams(prev => (prev.set("checkout", "true"), prev))}>Confirmar</Button>
        </Container>
    );
}

const Container = styled.div``;

const Grid = styled.div`
    display: grid;
    grid-template: repeat(5, 1fr) / repeat(10, 1fr);
    gap: 10px;
`;

const Seat = styled.div`
    width: 2em;
    aspect-ratio: 1 / 1;
    background-color: ${({ $taken, $selected }) => {
        if (!$taken && !$selected) return "#9db899";
        else if (!$taken && $selected) return "#fadbc5";
        else return "#2b2d36";
    }};

    border: ${({ $selected }) => ($selected ? "2px solid #ee897f" : "none")};
    border-radius: 9999px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: #2b2d36;
    font-size: 11px;
    font-family: sans-serif;
    text-decoration: none;
    user-select: none;
`;

const Button = styled.button``;
