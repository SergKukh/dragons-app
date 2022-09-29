import { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';
import { UserInformationResponse } from '../models/response/UserResponse';
import $api from './http';

export default class UserService {
    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registration', { email, password });
    }

    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', { email, password });
    }

    static async logout(): Promise<void> {
        return $api.post('/logout');
    }

    static async sendmail(): Promise<void> {
        return $api.post('/sendmail');
    }

    static async editEmail(email: string): Promise<AxiosResponse<UserInformationResponse>> {
        return $api.put<UserInformationResponse>('/email', { email });
    }

    static async getUserInformation(): Promise<AxiosResponse<UserInformationResponse>> {
        return $api.get<UserInformationResponse>('/user');
    }
}