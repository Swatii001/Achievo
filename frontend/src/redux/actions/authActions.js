// actions/authActions.js
import api from "../../api";
import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    SAVE_PROFILE,
    GOOGLE_LOGIN_REQUEST,
    GOOGLE_LOGIN_SUCCESS,
    GOOGLE_LOGIN_FAILURE,
} from "./actionTypes";
import { toast } from "react-toastify";

// Existing postLoginData function
export const postLoginData = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const { data } = await api.post("/auth/login", { email, password });
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
        });
        localStorage.setItem("token", data.token);
        toast.success(data.msg);
    } catch (error) {
        const msg = error.response?.data?.msg || error.message;
        dispatch({
            type: LOGIN_FAILURE,
            payload: { msg },
        });
        toast.error(msg);
    }
};

// New Google login action
export const postGoogleLoginData = () => async (dispatch) => {
    try {
        dispatch({ type: GOOGLE_LOGIN_REQUEST });
        const { data } = await api.post("/auth/google"); // Assuming this endpoint is set up
        dispatch({
            type: GOOGLE_LOGIN_SUCCESS,
            payload: data,
        });
        localStorage.setItem("token", data.token);
        toast.success("Google login successful!");
    } catch (error) {
        const msg = error.response?.data?.msg || error.message;
        dispatch({
            type: GOOGLE_LOGIN_FAILURE,
            payload: { msg },
        });
        toast.error(msg);
    }
};

// Existing saveProfile function
export const saveProfile = (token) => async (dispatch) => {
    try {
        const { data } = await api.get("/profile", {
            headers: { Authorization: token },
        });
        dispatch({
            type: SAVE_PROFILE,
            payload: { user: data.user, token },
        });
    } catch (error) {}
};

// Existing logout function
export const logout = () => (dispatch) => {
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT });
    document.location.href = "/";
};
