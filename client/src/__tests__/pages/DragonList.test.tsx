import { render, screen, act } from '@testing-library/react';
import DragonList from '../../pages/DragonList';

jest.mock('../../api/DragonsService', () => ({
    getAll: () => [{ id: 1 }, { id: 2 }]
}))

jest.mock('../../components/DragonListItem', () => {
    return () => <div data-testid='dragon-item'></div>
})

describe('DragonList', () => {
    test('items', async () => {
        await act(async () => {
            render(<DragonList />)
        });
        const dragons = await screen.findAllByTestId('dragon-item');
        expect(dragons.length).toBe(2);
    })
})