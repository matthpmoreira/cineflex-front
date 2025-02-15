import styled from "styled-components";
import { useSearchParams } from "wouter";

import Checkout from "./components/Checkout.jsx";
import Header from "./components/Header.jsx";
import Movies from "./components/Movies.jsx";
import Seats from "./components/Seats.jsx";
import Sessions from "./components/Sessions.jsx";

export default function App() {
    const [searchParams] = useSearchParams();

    const component = (() => {
        if (searchParams.get("movie") == null) {
            return <Movies />;
        } else if (searchParams.get("session") == null) {
            return <Sessions />;
        } else if (searchParams.get("checkout") == null) {
            return <Seats />;
        } else {
            return <Checkout />;
        }
    })();

    return (
        <>
            <Top>
                <Header />
            </Top>

            <Main>{component}</Main>
        </>
    );
}

const Top = styled.div`
    width: 100%;
    background: #ee897f;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Main = styled.div`
    width: 100%;
    height: 100%;
    background: #212226;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
`;
