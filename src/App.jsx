import styled from "styled-components";
import { useSearchParams } from "wouter";

import clapperboard from "./assets/clapperboard.png";
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
                    <Clapperboard src={clapperboard} />
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
    background: #ee897f;
    user-select: none;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const HomeAnchor = styled.a`
    color: #fadbc5;
    text-decoration: none;
    font-size: 2rem;
    font-weight: 600;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
`;

const Clapperboard = styled.img`
    display: block;
    height: 1em;
`;

const Main = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem;
    background: #212226;

    display: flex;
    flex-direction: column;
    align-items: center;
`;
