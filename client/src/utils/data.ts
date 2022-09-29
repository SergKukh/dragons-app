import DragonsService from '../api/DragonsService';
import { IDragon } from '../models/IDragon';

export const getStoragedDragons = (): IDragon[] | null => {
    const data = localStorage.getItem('dragons');
    if (data) {
        const dragons: IDragon[] = JSON.parse(data);
        return dragons;
    }
    return null;
}

export const storageDragons = (dragons: IDragon[]) => {
    localStorage.setItem('dragons', JSON.stringify(dragons));
}

export const getOneStoragedDragon = (id: string): IDragon | null => {
    const dragons = getStoragedDragons();
    if (dragons) {
        const dragon = dragons.find(item => item.id === id);
        if (dragon) return dragon;
    }
    return null;
}

export const fetchDragon = async (id: string): Promise<IDragon | null> => {
    const data = await DragonsService.getOne(id);
    if (data) {
        const dragons = getStoragedDragons();
        if (dragons) {
            storageDragons([...dragons.filter(item => item.id !== id), data]);
        } else {
            storageDragons([data]);
        }
        return data;
    }
    return null;
}