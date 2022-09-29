import axios, { AxiosError } from "axios";
import { AppDispatch } from "..";
import DragonsService from "../../api/DragonsService";
import { API_URL } from "../../api/http";
import UserService from "../../api/UserService";
import { IUser } from "../../models/IUser";
import { AuthResponse, AuthResponseBadRequest } from "../../models/response/AuthResponse";
import { authSlice } from "./authSlice";
import { dragonsSlice } from "./dragonsSlice";

export default {
    setUser: (user: IUser) => (dispatch: AppDispatch) => {
        dispatch(authSlice.actions.setUser(user));
    },
    login: (email: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            const response = await UserService.login(email, password);
            setAuth(dispatch, response.data.accessToken, response.data.user);
        } catch (error) {
            setAuthError(dispatch, error);
        }
    },
    registration: (email: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            const response = await UserService.registration(email, password);
            setAuth(dispatch, response.data.accessToken, response.data.user);
        } catch (error) {
            setAuthError(dispatch, error);
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        try {
            const response = await UserService.logout();
            localStorage.removeItem('token');
            dispatch(authSlice.actions.setIsAuth(false));
            dispatch(authSlice.actions.setUser({} as IUser));
            dispatch(authSlice.actions.setAuthError(''));
        } catch (error) {
            console.log(error);
        }
    },
    checkAuth: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(authSlice.actions.setIsLoading(true));
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
                withCredentials: true
            });
            setAuth(dispatch, response.data.accessToken, response.data.user);
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(authSlice.actions.setIsLoading(false));
        }
    },
    setAuthError: (error: string) => (dispatch: AppDispatch) => {
        dispatch(authSlice.actions.setAuthError(error));
    },
    addFavouriteDragon: (id: string) => (dispatch: AppDispatch) => {
        dispatch(dragonsSlice.actions.addFavourite(id));
        DragonsService.addFavourite(id);
    },
    deleteFavouriteDragon: (id: string) => (dispatch: AppDispatch) => {
        dispatch(dragonsSlice.actions.deleteFavourite(id));
        DragonsService.deleteFavourite(id);
    }
}

function setAuth(dispatch: AppDispatch, accessToken: string, user: IUser) {
    localStorage.setItem('token', accessToken);
    dispatch(authSlice.actions.setIsAuth(true));
    dispatch(authSlice.actions.setUser(user));
    dispatch(authSlice.actions.setAuthError(''));
    fetchFavourites(dispatch);
}

function setAuthError(dispatch: AppDispatch, error: any) {
    if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
            const data: AuthResponseBadRequest = error.response.data;
            let err = data.message;
            const params = data.errors.map(e => e.param).join(', ');
            if (params) {
                err = err + ': ' + params;
            }
            dispatch(authSlice.actions.setAuthError(err));
        }
    }
}

async function fetchFavourites(dispatch: AppDispatch) {
    try {
        const response = await DragonsService.getFavourites();
        dispatch(dragonsSlice.actions.setFavourites(response));
    } catch (error) {
        console.log(error);
    }
}