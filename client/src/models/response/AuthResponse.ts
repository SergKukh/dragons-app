import { IUser } from "../IUser";

export interface AuthResponse {
    accessToken: string,
    refreshToken: string,
    user: IUser
}

interface ValidationError {
    location: string,
    msg: string,
    param: string,
    value: string
}

export interface AuthResponseBadRequest {
    errors: ValidationError[],
    message: string
}