import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import BurgerMenuList, { ListItem } from "../../components/BurgerMenuList";

jest.mock('../../hooks/redux', () => ({
    useAppSelector: () => ({
        user: {
            email: 'test@test.com',
            isActivated: true,
            id: '1'
        }
    })
}))

jest.mock('react-router-dom', () => ({
    useNavigate: () => (route: string) => { }
}))

describe('burger menu', () => {
    test('items', async () => {
        const items: ListItem[] = [
            { title: '1', handler: () => { } },
            { title: '2', handler: () => { } },
            { title: '3', handler: () => { } },
        ]
        await act(async () => {
            render(<BurgerMenuList isActive={false} items={items} closeHandler={() => { }} />);
        })
        const elems = await screen.findAllByTestId('burger_menu_item');
        expect(elems.length).toBe(3);
        expect(elems).toMatchSnapshot();
    })
})