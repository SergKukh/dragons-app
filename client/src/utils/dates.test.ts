import { formatDate } from "./dates"

describe('dates', () => {
    test('formatDate', () => {
        expect(formatDate('2022-09-28')).toBe('28/09/2022');
    })

    test('formatDate', () => {
        expect(formatDate('2022.09.28')).toBe('28/09/2022');
    })
})