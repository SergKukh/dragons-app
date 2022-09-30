import { getOneStoragedDragon, storageDragons } from "../../utils/data"

describe('data', () => {
    test('getOneStoragedDragon', () => {
        const spy = jest.spyOn(Storage.prototype, 'getItem');
        getOneStoragedDragon('123');
        expect(spy).toBeCalledWith('dragons');
    })

    test('storageDragons', () => {
        const spy = jest.spyOn(Storage.prototype, 'setItem');
        storageDragons([]);
        expect(spy).toBeCalledWith('dragons', '[]');
    })
})