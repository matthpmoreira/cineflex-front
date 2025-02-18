import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "wouter";

import { getSessionById } from "../utils/api.js";

export default function Seats() {
    const [seats, setSeats] = useState(null);
    const [selected, setSelected] = useState(new Set());

    const [searchParams, setSearchParams] = useSearchParams();
    const sessionId = searchParams.get("session");
    const movieId = searchParams.get("movie");

    useEffect(() => {
        getSessionById(sessionId).then(session => setSeats(session.seats));
    }, [movieId, sessionId]);

    function toggleSeat(number, available) {
        if (!available) {
            return () => alert("Esse assento não está disponível");
        }

        return () => {
            if (selected.has(number)) {
                selected.delete(number);
            } else {
                selected.add(number);
            }

            setSelected(new Set(selected));
        };
    }

    function checkout() {
        if (selected.size === 0) {
            alert("Selecione pelo menos um assento");
            return;
        }

        const seatIds = seats.filter(seat => selected.has(seat.number)).map(seat => seat.number);
        setSearchParams(prev => (prev.set("seats", seatIds.join(" ")), prev));
    }

    return (
        <>
            <Grid>
                {seats?.map(({ number, available }) => (
                    <Seat
                        key={number}
                        $available={available}
                        $selected={selected.has(number)}
                        onClick={toggleSeat(number, available)}
                    >
                        {number}
                    </Seat>
                ))}
            </Grid>
            <Button onClick={checkout}>Confirmar</Button>
        </>
    );
}

const Grid = styled.div`
    display: grid;
    grid-template: repeat(5, 1fr) / repeat(10, 1fr);
    gap: 10px;
`;

const Seat = styled.div`
    width: 2em;
    aspect-ratio: 1 / 1;
    background-color: ${({ $available, $selected }) => {
        if ($available && !$selected) return "#9db899";
        else if ($available && $selected) return "#fadbc5";
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
