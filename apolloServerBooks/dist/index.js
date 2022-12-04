import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLError } from 'graphql';
// Apollo Server
// GraphQL type defs
// Resolvers
// Datasets
const books = [
    {
        title: 'Cooper Codes Book',
        author: 'Cooper Codes',
        id: 1,
    },
    {
        title: 'Paul Book of Dev',
        author: 'Paul Thomas',
        id: 2,
    },
    {
        title: 'The Third Tome',
        author: 'Wagner Ross',
        id: 3,
    },
];
// TypeDefs
const typeDefs = `#graphql
    type Book {
        title: String,
        author: String,
        id: Int
    }

    type Query {
        books: [Book]
        getBooksByAuthor(author: String): [Book]
        getBookByID(id: Int): Book
    }
`;
// Resolvers
const resolvers = {
    Query: {
        books: () => books,
        getBooksByAuthor: (_parent, args) => {
            const authorBooks = books.filter((book) => book.author === args.author);
            if (authorBooks.length > 0) {
                return authorBooks;
            }
            else {
                throw new GraphQLError('No books for author: ' + args.author, {
                    extensions: {
                        code: 'BOOKS_NOT_FOUND',
                    },
                });
            }
        },
        getBookByID: (_parent, args) => {
            const bookIndex = books.findIndex((book) => book.id === args.id);
            if (bookIndex !== -1) {
                return books[bookIndex];
            }
            else {
                throw new GraphQLError('No books for id: ' + args.id, {
                    extensions: {
                        code: 'BOOKS_NOT_FOUND',
                    },
                });
            }
        },
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000,
    },
});
