import axios from 'axios';
import { IDragon } from '../models/IDragon';
import $api from './http';

export const url = 'https://api.spacexdata.com/v4/dragons';

export default class DragonsService {
    static async getAll(): Promise<IDragon[]> {
        try {
            const response = await axios.get<IDragon[]>(url);
            return response.data;
        } catch (error) {
            return [];
        }
    }

    static async getOne(id: string): Promise<IDragon | null> {
        try {
            const response = await axios.get<IDragon>(`${url}/${id}`);
            return response.data;
        } catch (error) {
            return null;
        }
    }

    static async getFavourites(): Promise<string[]> {
        try {
            const response = await $api.get<string[]>('/dragons/favourites');
            return response.data;
        } catch (error) {
            return []
        }
    }

    static async addFavourite(id: string): Promise<void> {
        try {
            return $api.put('/dragons/favourites', { id });
        } catch (error) {
            return;
        }
    }

    static async deleteFavourite(id: string): Promise<void> {
        try {
            return $api.delete(`/dragons/favourites/${id}`);
        } catch (error) {
            return;
        }
    }
}