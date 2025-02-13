import styled from "styled-components";

export default function NewPoster(props) {
    return (
        <Container>
            <Image poster={props.poster} />
            <Title>{props.title}</Title>
        </Container>
    );
}

const Title = styled.div`
    color: white;
    filter: opacity(0);
    text-align: center;
    user-select: none;

    transform: translate(-50%, -50%);
    position: absolute;
    left: 50%;
    top: 50%;
`;

const Image = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-image: url(${props => props.poster});
    background-position: center;
    background-size: cover;
`;

const Container = styled.div`
    width: 200px;
    aspect-ratio: 3 / 4;
    position: relative;
    flex-shrink: 0;

    &:hover {
        ${Image} {
            filter: brightness(0.6);
        }

        ${Title} {
            filter: opacity(1);
        }
    }
`;
