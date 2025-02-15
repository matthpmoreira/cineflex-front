import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "wouter";

import { fetchSessions } from "../utils/backend.js";

export default function Sessions() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sessions, setSessions] = useState(null);
    const movieId = searchParams.get("movie");

    useEffect(() => {
        fetchSessions(movieId).then(res => setSessions(res.data));
    }, [movieId]);

    function setQueryParam(id) {
        setSearchParams({ movie: movieId, session: id });
    }

    return (
        <SelectionRow>
            {sessions?.map(session => (
                <Session key={session._id} onClick={() => setQueryParam(session._id)}>
                    ${session.date}
                </Session>
            ))}
        </SelectionRow>
    );
}

const SelectionRow = styled.div``;
const Session = styled.div``;
