import styled from "styled-components";
import { useSearchParams } from "wouter";

import Checkout from "./components/Checkout.jsx";
import Movies from "./components/Movies.jsx";
import Seats from "./components/Seats.jsx";
import Sessions from "./components/Sessions.jsx";

export default function App() {
    const [searchParams, setSearchParams] = useSearchParams();

    function goToHomePage(event) {
        event.preventDefault();
        setSearchParams({});
    }

    return (
        <>
            <Header>
                <HomeAnchor href="?" onClick={goToHomePage}>
                    <Clapperboard xmlns="http://www.w3.org/2000/svg" viewBox="0.013 5.354 511.975 501.291">
                        <path d="M511.737 189.898H170.41l340.546-78.653-17.374-75.372c-4.875-21.125-25.718-34.343-46.56-29.53L30.043 102.652C12.324 106.745.294 122.557.075 140.213H.013l.094 327.152c0 21.687 17.563 39.28 39.217 39.28h433.447c21.654 0 39.217-17.596 39.217-39.28l-.251-277.467zM402.368 47.186l67.436 44.03-51.997 12-67.437-44 51.998-12.03zM297.466 71.435l67.436 44.03-51.998 12-67.434-44 51.996-12.03zM195.097 95.089l67.435 44.03-51.998 12-67.434-44.03 51.997-12zm-104.62 24.157l67.403 44.029-51.998 12-67.402-43.998 51.997-12.031zm382.262 348.119H39.229V229.084h433.51v238.281zM215.096 286.091v127.526l102.026-63.779z" />
                    </Clapperboard>
                    Cineflex
                </HomeAnchor>
            </Header>

            <Main>{getComponent(searchParams)}</Main>
        </>
    );
}

function getComponent(searchParams) {
    if (!searchParams.has("movie")) {
        return <Movies />;
    } else if (!searchParams.has("session")) {
        return <Sessions />;
    } else if (!searchParams.has("seats")) {
        return <Seats />;
    } else {
        return <Checkout />;
    }
}

const Header = styled.div`
    width: 100%;
    padding: 1rem;
    user-select: none;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const HomeAnchor = styled.a`
    color: white;
    font-size: 2rem;
    text-decoration: none;
    font-family: "Eighties", sans-serif;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    filter: drop-shadow(-1px -1px 3px #00aeefff) drop-shadow(1px 1px 3px #ec008caa);
`;

const Clapperboard = styled.svg`
    height: 1.2em;
    fill: white;
`;

const Main = styled.div`
    width: min(1000px, 100%);
    padding: 1rem;
    margin: auto;
    background: #222;
    border-radius: 1rem;
`;
