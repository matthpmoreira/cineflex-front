import styled from "styled-components";

export default function SelectionRow({ title, isOpen, setOpen, children }) {
    return (
        <Container>
            <Head onClick={setOpen}>
                <Title>{title}</Title>
            </Head>
            <BodyWrapper $isOpen={isOpen}>
                <Body>{children}</Body>
            </BodyWrapper>
        </Container>
    );
}

const Container = styled.div`
    //width: 100%;
    //display: flex;
    //flex-direction: column;
`;

const Head = styled.div`
    //width: 100%;
    padding: 0.5rem 0.25rem;
    border-bottom: solid 1px white;
`;

const Title = styled.h2``;

const BodyWrapper = styled.div`
    ${({ $isOpen }) => ($isOpen ? "" : "height: 0;")}
    overflow: hidden;
`;

const Body = styled.div`
    //width: 100%;
    overflow-x: scroll;

    display: flex;
    justify-content: safe center;
    gap: 1rem;
`;
