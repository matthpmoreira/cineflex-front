import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "wouter";

import { getSessionById } from "../utils/api.js";
import { Button } from "./Button.jsx";

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
            return () => alert("Este assento não está disponível");
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
        <div>
            <H1>Selecione os assentos</H1>
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
        </div>
    );
}

const H1 = styled.h1`
    color: white;
`;

const Grid = styled.div`
    width: min-content;
    margin: auto;

    display: grid;
    grid-template: repeat(5, 1fr) / repeat(10, 1fr);
    gap: 10px;
`;

const Seat = styled.div`
    width: 3ch;
    aspect-ratio: 1 / 1;
    background-color: ${({ $available, $selected }) => {
        if ($available && !$selected) return "#00aeef";
        else if ($available && $selected) return "#ec008c";
        else return "#111";
    }};

    border: ${props => (props.$selected ? "2px solid #ec008c" : "none")};
    border-radius: 9999px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: ${props => (props.$selected ? "white" : "#111")};
    font-size: 11px;
    font-weight: bold;
    user-select: none;
`;
