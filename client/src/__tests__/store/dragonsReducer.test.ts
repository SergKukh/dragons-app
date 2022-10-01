import dragonsReducer, { dragonsSlice } from "../../store/reducers/dragonsSlice";

describe('dragonsReducer', () => {
    test('setFavourites', () => {
        const favourites = ['1', '2', '3'];
        expect(dragonsReducer(dragonsSlice.getInitialState(),
            dragonsSlice.actions.setFavourites(favourites)))
            .toEqual({ ...dragonsSlice.getInitialState(), favourites });
    })

    test('addFavourite', () => {
        const favourite = '4';
        const favourites = ['1', '2', '3'];
        expect(dragonsReducer({ ...dragonsSlice.getInitialState(), favourites },
            dragonsSlice.actions.addFavourite(favourite)))
            .toEqual({ ...dragonsSlice.getInitialState(), favourites: [...favourites, favourite] });
    })

    test('deleteFavourite', () => {
        const favourite = '3';
        const favourites = ['1', '2', '3'];
        expect(dragonsReducer({ ...dragonsSlice.getInitialState(), favourites },
            dragonsSlice.actions.deleteFavourite(favourite)))
            .toEqual({ ...dragonsSlice.getInitialState(), favourites: favourites.filter(i => i !== favourite) });
    })
})