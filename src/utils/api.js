import axios from "axios";

const url = import.meta.env.VITE_API_URL;
const movies = {};
const sessions = {};

export async function getAllMovies() {
    if (Object.keys(movies).length === 0) {
        const response = await axios.get(`${url}/movies`);

        if (response.status !== 200) {
            return response;
        }

        response.data.forEach(movie => (movies[movie.id] = movie));
    }

    return Object.values(movies);
}

export async function getMovieById(id) {
    if (movies[id] == null) {
        const response = await axios.get(`${url}/movies/${id}`);

        if (response.status !== 200) {
            return response;
        }

        movies[id] = response.data;
    }

    return movies[id];
}

export async function getSessionById(id) {
    if (sessions[id] == null) {
        const response = await axios.get(`${url}/sessions/${id}`);

        if (response.status !== 200) {
            return response;
        }

        sessions[id] = response.data;
    }

    return sessions[id];
}

export async function postTicket(ticket) {
    delete sessions[ticket.session];
    return axios.post(`${url}/tickets`, ticket);
}
