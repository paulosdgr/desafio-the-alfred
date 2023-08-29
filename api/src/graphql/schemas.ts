import { gql } from 'graphql-tag';

export const typeDefs = gql`
    type Character {
        id: Int!
        name: String!
        description: String
        thumbnail: Image
        comics: [Comic]
    }

    type Image {
        path: String!
        extension: String!
    }

    type Comic {
        id: Int!
        digitalId: Int!
        title: String!
        images: [Image]
    }

    type Query {
        getCharacters(limit: Int, offset: Int, orderByName: Boolean, search: String): [Character]
        getCharacterById(id: Int!): Character
    }
`;
