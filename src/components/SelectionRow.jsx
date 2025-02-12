import styled from "styled-components";

export default function SelectionRow({ title, children }) {
    return (
        <Container>
            <Head>
                <Title>{title}</Title>
            </Head>
            <Body>{children}</Body>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    //display: flex;
    //flex-direction: column;
`;

const Head = styled.div`
    width: 100%;
    padding: 0.5rem 0.25rem;
    border-bottom: solid 1px white;
`;

const Title = styled.h2``;

const Body = styled.div`
    width: 100%;
    overflow-x: scroll;

    display: flex;
    justify-content: center;
    gap: 5px;
`;
