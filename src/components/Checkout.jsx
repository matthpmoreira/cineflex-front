import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "wouter";

import { getMovieById, getSessionById, postTicket } from "../utils/api.js";

export default function Checkout() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [movie, setMovie] = useState(null);
    const [session, setSession] = useState(null);
    const [isSubmitting, setSubmitting] = useState(false);
    const seats = searchParams.get("seats").split(" ");
    const date = new Date(session == null ? 0 : session.date);

    useEffect(() => {
        getMovieById(searchParams.get("movie")).then(movie => setMovie(movie));
        getSessionById(searchParams.get("session")).then(session => setSession(session));
    });

    async function submit(event) {
        event.preventDefault();
        setSubmitting(true);
        await postTicket({ session: session.id, seats });
        setSubmitting(false);
        setSearchParams({});
    }

    return (
        movie != null &&
        session != null && (
            <div>
                <>
                    <Title>Verifique seu pedido</Title>
                    <Data>
                        <section>
                            <Something>Filme e sessão</Something>
                            <Separator />
                            {movie.title}
                            <br />
                            {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} às ${date.getHours()}:${date.getMinutes()}`}
                        </section>
                        <section>
                            <Something>Assentos</Something>
                            <Separator />
                            {seats.map(number => (
                                <>
                                    {number}
                                    <br />
                                </>
                            ))}
                        </section>
                    </Data>
                    {/*<Button to="/">Voltar para a tela inicial</Button>*/}

                    {/*<Form onSubmit={submit}>*/}
                    {/*    <Field>*/}
                    {/*        <Label htmlFor="name">Nome do comprador(a)</Label>*/}
                    {/*        <Input*/}
                    {/*            // onChange={}*/}
                    {/*            id="name"*/}
                    {/*            type="text"*/}
                    {/*            placeholder="Digite seu nome..."*/}
                    {/*            required*/}
                    {/*        />*/}
                    {/*    </Field>*/}
                    {/*    <Field>*/}
                    {/*        <Label htmlFor="cpf">CPF do comprador(a)</Label>*/}
                    {/*        <Input*/}
                    {/*            // onChange={}*/}
                    {/*            id="cpf"*/}
                    {/*            type="text"*/}
                    {/*            placeholder="Digite seu CPF..."*/}
                    {/*            pattern="[0-9]{3}.{0,1}[0-9]{3}.{0,1}[0-9]{3}-{0,1}[0-9]{2}"*/}
                    {/*            required*/}
                    {/*        />*/}
                    {/*    </Field>*/}
                    <Submit onClick={submit} disabled={isSubmitting}>
                        Reservar assento(s)
                    </Submit>
                    <div style={{ color: "white" }}>
                        *As páginas de checkout e conclusão ainda estão em desenvolvimento
                    </div>
                    {/*</Form>*/}
                </>
            </div>
        )
    );
}

const Title = styled.div`
    color: white;
    font-size: 24px;
    text-align: center;
`;

const Data = styled.div`
    padding: 1em;
    background: #2b2d36;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    gap: 1em;

    color: white;
    font-size: 20px;
    line-height: 2em;
`;

const Separator = styled.div`
    height: 1px;
    background: #4e5a65;
    margin: 5px 0;
`;

const Something = styled.div`
    color: #ee897f;
    font-weight: bold;
    font-size: 22px;
`;

const Button = styled.div`
    background: #ee897f;
    padding: 0.5em;
    margin-top: 20px;
    border: none;
    border-radius: 8px;

    display: block;
    justify-content: center;
    align-items: center;

    color: #2b2d36;
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: fill;
    gap: 1em;
`;

const Field = styled.div``;

const Label = styled.label`
    display: block;
    margin-bottom: 0.25em;

    color: white;
`;

const Input = styled.input`
    display: block;
    width: 100%;
    padding: 0.6em 1em;
    border: 1px solid #d4d4d4;
    border-radius: 8px;

    &:placeholder-shown {
        color: #afafaf;
        font-style: italic;
    }
`;

const Submit = styled.button`
    background: #ee897f;
    padding: 0.5em;
    border: none;
    border-radius: 8px;

    color: #2b2d36;
    font-size: 18px;
    font-weight: bold;
`;
