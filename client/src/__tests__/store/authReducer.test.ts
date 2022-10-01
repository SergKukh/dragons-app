import { IUser } from "../../models/IUser";
import authReducer, { authSlice } from "../../store/reducers/authSlice";

describe('authReducer', () => {
    test('setIsAuth', () => {
        expect(authReducer(authSlice.getInitialState(),
            authSlice.actions.setIsAuth(true)))
            .toEqual({ ...authSlice.getInitialState(), isAuth: true });
    })

    test('setUser', () => {
        const user: IUser = {
            id: '123',
            email: 'test@test.com',
            isActivated: true
        }
        expect(authReducer(authSlice.getInitialState(),
            authSlice.actions.setUser(user)))
            .toEqual({ ...authSlice.getInitialState(), user });
    })

    test('setIsLoading', () => {
        expect(authReducer(authSlice.getInitialState(),
            authSlice.actions.setIsLoading(true)))
            .toEqual({ ...authSlice.getInitialState(), isLoading: true });
    })

    test('setAuthError', () => {
        const error = 'test';
        expect(authReducer(authSlice.getInitialState(),
            authSlice.actions.setAuthError(error)))
            .toEqual({ ...authSlice.getInitialState(), authError: error });
    })
})