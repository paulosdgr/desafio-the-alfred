import { getCharacter, getComics } from './sources/marvel_api';
import { resolvers } from './resolvers';

jest.mock('./sources/marvel_api', () => ({
    getCharacter: jest.fn(),
    getComics: jest.fn(),
}));

describe('GraphQL Resolvers', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('resolves getCharacters query', async () => {
        const mockGetCharacter = getCharacter as jest.MockedFunction<typeof getCharacter>;
        const charactersData = [
            { id: 1, name: 'Spider-Man' },
            { id: 2, name: 'Iron Man' },
        ];

        mockGetCharacter.mockResolvedValue(charactersData);

        const result = await resolvers.Query.getCharacters(undefined, {
            limit: 10,
            offset: 0,
            orderByName: false,
            search: '',
        });

        expect(result).toEqual(charactersData);
        expect(getCharacter).toHaveBeenCalledWith(10, 0, false, '');
    });

    it('resolves comics field for a Character', async () => {
        const mockGetComics = getComics as jest.MockedFunction<typeof getComics>;
        const character = { id: 1 };
        const comicsData = [
            { id: 123, title: 'Amazing Spider-Man #1' },
            { id: 456, title: 'Amazing Spider-Man #2' },
        ];

        mockGetComics.mockResolvedValue(comicsData);

        const result = await resolvers.Character.comics(character);

        expect(result).toEqual(comicsData);
        expect(getComics).toHaveBeenCalledWith(character.id);
    });
});
