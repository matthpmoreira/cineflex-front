import axios from "axios";

export async function fetchMovies() {
    return axios.get("https://cineflex-back.onrender.com");
}

export async function fetchSessions(movieId) {
    return axios.get(`https://cineflex-back.onrender.com/movies/${movieId}/sessions`);
}

export async function fetchSeats(movieId, sessionId) {
    return axios.get(`https://cineflex-back.onrender.com/movies/${movieId}/sessions/${sessionId}/seats`);
}
