import mockAxios from 'jest-mock-axios';
import DragonsService, { url } from './DragonsService';

describe('dragons', () => {
    afterEach(() => {
        mockAxios.reset();
    });

    test('getAll', async () => {
        mockAxios.mockResolvedValueOnce({ data: [] })
        const data = await DragonsService.getAll();
        expect(mockAxios.get).toBeCalledWith(url);
        expect(data).toEqual([]);
    })

    test('getOne', async () => {
        const id = '123';
        const data = await DragonsService.getOne(id);
        expect(mockAxios.get).toBeCalledWith(`${url}/${id}`);
    })

    test('getFavourites', async () => {
        await DragonsService.getFavourites();
        expect(mockAxios.get).toBeCalledWith('/dragons/favourites');
    })

    test('addFavourite', async () => {
        const id = '123';
        await DragonsService.addFavourite(id);
        expect(mockAxios.put).toBeCalledWith('/dragons/favourites', { id });
    })

    test('deleteFavourite', async () => {
        const id = '123';
        await DragonsService.deleteFavourite(id);
        expect(mockAxios.delete).toBeCalledWith(`/dragons/favourites/${id}`);
    })
})