import axios from "axios";

const BACKEND_URL =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";
const LOGIN_PATH = "/login";
const SIGNUP_PATH = "/signup";

const api = {
    async login(payload) {
        try {
            const response = await axios.post(
                BACKEND_URL + LOGIN_PATH,
                payload
            );

            return response.data;
        } catch (err) {
            if (err.response) return err.response.data;
            else return { error: err.message };
        }
    },
    async signup(payload) {
        try {
            const response = await axios.post(
                BACKEND_URL + SIGNUP_PATH,
                payload
            );

            return response.data;
        } catch (err) {
            if (err.response) return err.response.data;
            else return { error: err.message };
        }
    },
};

export default api;
