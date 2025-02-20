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
    text-decoration: none;
    font-size: 2rem;
    font-weight: 600;
    font-family: "Eighties", sans-serif;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
`;

const Main = styled.div`
    width: min(1000px, 100%);
    padding: 1rem;
    margin: auto;
    background: #222;
    border-radius: 1rem;
`;
