import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface DragonsState {
    favourites: string[]
}

const initialState: DragonsState = {
    favourites: []
}

export const dragonsSlice = createSlice({
    name: 'dragons',
    initialState,
    reducers: {
        setFavourites(state, action: PayloadAction<string[]>) {
            state.favourites = action.payload;
        },
        addFavourite(state, action: PayloadAction<string>) {
            state.favourites.push(action.payload);
        },
        deleteFavourite(state, action: PayloadAction<string>) {
            state.favourites = state.favourites.filter(id => id !== action.payload);
        }
    }
})

export default dragonsSlice.reducer;