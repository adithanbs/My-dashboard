import client from '../../apolloClient';
import { GET_CUSTOMER_QUERY } from '../queries/query-gql-docs';

const getUser = (customerId) => {

    return client.query({
        query: GET_CUSTOMER_QUERY,
        variables: {
            customerId: customerId
        },
        context: {
            uri: process.env.REACT_APP_CUSTOMER_URL
        },
        fetchPolicy: 'network-only'
    });
};

export const AuthService = { getUser };
