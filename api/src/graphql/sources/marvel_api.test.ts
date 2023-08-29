import { getCharacter, getComics, marvelApi } from './marvel_api';

jest.mock('axios', () => {
    return {
        create: jest.fn(() => ({
            get: jest.fn(),
        })),
    };
});

const params = {
    ts: '123456789',
    apikey: 'public-key',
    hash: 'hash',
};

describe('Marvel API functions', () => {
    const mockMarvelApi = marvelApi as jest.Mocked<typeof marvelApi>;
    process.env.MARVEL_PUBLIC_KEY = 'public-key';
    process.env.MARVEL_PRIVATE_KEY = 'private-key';
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fetches characters from the API', async () => {
        const characterData = {
            data: {
                data: {
                    results: [{ id: 1, name: 'Spider-Man' }],
                },
            },
        };

        mockMarvelApi.get.mockResolvedValue(characterData);

        const characters = await getCharacter();

        expect(characters).toEqual(characterData.data.data.results);
    });

    it('fetches comics for a character from the API', async () => {
        const characterId = 1;
        const comicsData = {
            data: {
                data: {
                    results: [{ id: 123, title: 'Amazing Spider-Man #1' }],
                },
            },
        };

        mockMarvelApi.get.mockResolvedValue(comicsData);

        const comics = await getComics(characterId);

        expect(comics).toEqual(comicsData.data.data.results);
    });
});
