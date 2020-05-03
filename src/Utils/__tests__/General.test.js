import { generateUId, generateTime } from '../General';


describe('Generate time', () => {
    test('generate the expected input str', () => {
        expect(generateTime(1588480262751)).toBe('23:31');
    });
    test('generate the expected input str when min & hrs are equal to zero', () => {
        expect(generateTime(1588395602000)).toBe('00:00');
    });
});


describe('generateUId', () => {
    test('generate the expected input str when min & hrs are equal to zero', () => {
        expect(typeof generateUId()).toBe('number');
    });
});