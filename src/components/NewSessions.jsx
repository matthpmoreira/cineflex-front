import { useEffect, useState } from "react";
import styled from "styled-components";

import { fetchSessions } from "../utils/backend.js";
import SelectionRow from "./SelectionRow.jsx";

export default function NewSessions() {
    const [sessions, setSessions] = useState(null);
    const [movieId, setMovieId] = useState(null);
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        function updateOpen() {
            const url = new URL(window.location);
            const movieId = url.searchParams.get("movie");
            const sessionId = url.searchParams.get("session");

            setMovieId(movieId);
            setOpen(movieId != null && sessionId == null);
        }

        updateOpen();
        window.addEventListener("onpushstate", () => updateOpen());
    }, []);

    useEffect(() => {
        fetchSessions(movieId).then(res => setSessions(res.data));
    }, [movieId]);

    function setQueryParam(session) {
        const url = new URL(window.location);
        url.searchParams.delete("seats");

        if (session == null) {
            url.searchParams.delete("session");
        } else {
            url.searchParams.set("session", session);
        }

        window.history.pushState(null, "", url);
    }

    return (
        <SelectionRow title="Selecione uma sessão" isOpen={isOpen} setOpen={() => setQueryParam(null)}>
            {sessions?.map(session => (
                <Session key={session._id} onClick={() => setQueryParam(session._id)}>
                    ${session.date}
                </Session>
            ))}
        </SelectionRow>
    );
}

const Session = styled.div``;
