import { gql } from '@apollo/client';

export const DELET_USER_MUTATION = gql`
  mutation deleteCustomer($customerId: Int) {
    deleteCustomer(customerId: $customerId)
  }
`;

