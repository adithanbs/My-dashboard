import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';

const link = createUploadLink({ uri: process.env.REACT_APP_PROFILE_URL });
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);
});
const cache = new InMemoryCache();
const client = new ApolloClient({
    link: from([errorLink, link]),
    cache
});

export default client;
