import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import {useParams} from "react-router-dom";

export default function SeatGrid({ toggleSelectedSeat }) {
    const { movieId, sessionId } = useParams();
    const [seats, setSeats] = useState(null);

    useEffect(() => {
        axios.get("https://cineflex-back.onrender.com/movies/" + movieId + "/sessions/" + sessionId + "/seats")
            .then(res => setSeats(res.data))
            .catch(err => console.log(err))
    }, []);

    return (
        <Wrapper>
            {seats?.map((obj, i) => <Seat
                key={i}
                obj={obj}
                toggleSelectedSeat={toggleSelectedSeat}
            />)}
        </Wrapper>
    )
}

function Seat({ obj, toggleSelectedSeat }) {
    const [isSelected, setIsSelected] = useState(false);

    function toggleIsSelected() {
        if (obj.taken) {
            alert("Esse assento não está disponível");
            return;
        }

        toggleSelectedSeat(obj);
        setIsSelected(!isSelected);
    }

    return (
        <SeatWrapper onClick={toggleIsSelected} $isAvailable={!obj.taken} $isSelected={isSelected}>
            {obj.number}
        </SeatWrapper>
    )
}

const Wrapper = styled.div`
    display: grid;
    grid-template: repeat(5, 1fr) / repeat(10, 1fr);
    gap: 10px;
`

const SeatWrapper = styled.div`
    width: 100%;
    max-width: 2em;
    aspect-ratio: 1 / 1;
    background-color: ${({ $isAvailable, $isSelected }) => {
        if ($isAvailable && !$isSelected)
            return "#9db899";
        else if ($isAvailable && $isSelected)
            return "#fadbc5";
        else
            return "#2b2d36";

    }};
    border: ${({ $isSelected }) => $isSelected ? "2px solid #ee897f" : "none"};
    border-radius: 9999px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: #2b2d36;
    font-size: 11px;
    font-family: sans-serif;
    text-decoration: none;
    user-select: none;
`
