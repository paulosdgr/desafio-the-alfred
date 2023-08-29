import { getCharacter, getCharacterById, getComics } from './sources/marvel_api';

interface getCharactersArgs {
    limit: number;
    offset: number;
    orderByName: boolean;
    search: string;
}

export const resolvers = {
    Query: {
        getCharacters: async (
            _: unknown,
            { limit = 20, offset = 0, orderByName = false, search = '' }: getCharactersArgs,
        ) => await getCharacter(limit, offset, orderByName, search),

        getCharacterById: async (_: unknown, { id }: { id: number }) => await getCharacterById(id),
    },

    Character: {
        comics: async ({ id }: { id: number }) => await getComics(id),
    },
};
