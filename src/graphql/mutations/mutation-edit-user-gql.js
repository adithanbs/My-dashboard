import { gql } from '@apollo/client';


export const UPDATE_USER_PROFILE_MUTATION = gql`
mutation updateCustomer($updateData: CustomerUpdateRequest!) {
  updateCustomer(customer: $updateData)
}
`;
