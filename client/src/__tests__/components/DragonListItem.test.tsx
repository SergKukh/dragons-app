import { render, screen, act } from '@testing-library/react';
import DragonListItem from '../../components/DragonListItem';
import { IDragon } from '../../models/IDragon';

jest.mock('../../components/UI/Carousel', () => {
    return () => <div data-testid='carousel'></div>
})

jest.mock('react-router-dom', () => ({
    Link: () => <div></div>
}))

describe('DragonListItem', () => {
    test('carousel', async () => {
        await act(async () => {
            render(<DragonListItem dragon={{} as IDragon} />)
        });
        const carousel = await screen.findAllByTestId('carousel');
        expect(carousel.length).toBe(1);
    })
}) 