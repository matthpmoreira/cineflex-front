import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Display from "./components/Display.jsx";
import Sessions from "./components/Sessions.jsx";
import Seats from "./components/Seats.jsx";
import Success from "./components/Success.jsx";
import styled from "styled-components";

export default function App() {
    const [movieTitle, setMovieTitle] = useState(null);
    const [sessionInfo, setSessionInfo] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [personalInfo, setPersonalInfo] = useState(null);

    function cleanState(state) {
        switch (state) {
            case "movie": setMovieTitle(null);
            case "session": setSessionInfo(null);
            case "seats": setSelectedSeats([]);
            case "personalInfo": setPersonalInfo(null);
        }
    }

    function toggleSelectedSeat(target) {
        const index = selectedSeats.indexOf(selectedSeats.find(query => query.id === target.id));

        if (index > -1) {
            setSelectedSeats(selectedSeats.toSpliced(index, 1));
        } else {
            setSelectedSeats([...selectedSeats, target]);
        }
    }

    console.log(movieTitle);
    console.log(sessionInfo);
    console.log(selectedSeats);
    console.log(personalInfo);

    return (
        <BrowserRouter>
            <Top>
                <Header />
            </Top>

            <Main>
                <Routes>
                    <Route path="/" element={<Display setMovieTitle={setMovieTitle} cleanState={cleanState} />} />
                    <Route path="/movies/:movieId/sessions" element={<Sessions setSessionInfo={setSessionInfo} cleanState={cleanState} />} />
                    <Route path="/movies/:movieId/sessions/:sessionId/seats" element={<Seats toggleSelectedSeat={toggleSelectedSeat} setPersonalInfo={setPersonalInfo} cleanState={cleanState} />} />
                    {/* Temporarily deactivated while I haven't implemented authentication */}
                    {/*<Route path="/success" element={<Success data={{ movieTitle, sessionInfo, selectedSeats, personalInfo }} />} />*/}
                    <Route path="/success" element={<h1 style={{ color: "white", fontSize: "2rem", marginTop: "2rem" }}>Sua reserva foi realizada com sucesso!</h1>} />
                </Routes>
            </Main>
        </BrowserRouter>
    )
}

const Top = styled.div`
    width: 100%;
    background: #ee897f;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Main = styled.div`
    width: 100%;
    background: #212226;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
`
