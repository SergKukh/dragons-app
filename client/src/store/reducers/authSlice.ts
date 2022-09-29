import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models/IUser';

interface AuthState {
    isAuth: boolean,
    user: IUser,
    isLoading: boolean,
    authError: string
}

const initialState: AuthState = {
    isAuth: false,
    user: {} as IUser,
    isLoading: false,
    authError: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setAuthError(state, action: PayloadAction<string>) {
            state.authError = action.payload;
        }
    }
})

export default authSlice.reducer;