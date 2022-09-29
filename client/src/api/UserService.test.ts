import mockAxios from 'jest-mock-axios';
import UserService from './UserService';

describe('users', () => {
    afterEach(() => {
        mockAxios.reset();
    });

    test('registration', async () => {
        const email = 'user@test.com';
        const password = 'qwerty123';
        await UserService.registration(email, password);
        expect(mockAxios.post).toBeCalledWith('/registration', { email, password });
    })

    test('login', async () => {
        const email = 'user@test.com';
        const password = 'qwerty123';
        await UserService.login(email, password);
        expect(mockAxios.post).toBeCalledWith('/login', { email, password });
    })

    test('logout', async () => {
        await UserService.logout();
        expect(mockAxios.post).toBeCalledWith('/logout');
    })

    test('sendmail', async () => {
        await UserService.sendmail();
        expect(mockAxios.post).toBeCalledWith('/sendmail');
    })

    test('editEmail', async () => {
        const email = 'user@test.com';
        await UserService.editEmail(email);
        expect(mockAxios.put).toBeCalledWith('/email', { email });
    })

    test('getUserInformation', async () => {
        await UserService.getUserInformation();
        expect(mockAxios.get).toBeCalledWith('/user');
    })
})