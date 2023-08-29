import axios from 'axios';
import { createHash } from 'crypto';

const TIMESTAMP = new Date().getTime().toString();
const BASE_URL = 'https://gateway.marvel.com/v1/public';

export const marvelApi = axios.create({
    baseURL: BASE_URL,
});

function buildParams(): { ts: string; apikey: string; hash: string } {
    const hash = createHash('md5')
        .update(TIMESTAMP + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_PUBLIC_KEY)
        .digest('hex');

    return {
        ts: TIMESTAMP,
        apikey: process.env.MARVEL_PUBLIC_KEY!,
        hash,
    };
}

export const getCharacter = async (limit = 20, offset = 0, orderByName = false, search = '') => {
    const { data: response } = await marvelApi.get(`${BASE_URL}/characters`, {
        params: {
            limit,
            offset,
            orderBy: orderByName ? 'name' : 'modified',
            nameStartsWith: search || undefined,
            ...buildParams(),
        },
    });

    return response.data.results;
};

export const getCharacterById = async (id: number) => {
    const { data: response } = await marvelApi.get(`${BASE_URL}/characters/${id}`, {
        params: {
            ...buildParams(),
        },
    });

    return response.data.results[0];
};

export const getComics = async (characterId: number) => {
    const { data: response } = await marvelApi.get(`${BASE_URL}/characters/${characterId}/comics`, {
        params: {
            limit: 10,
            offset: 0,
            ...buildParams(),
        },
    });

    return response.data.results;
};
