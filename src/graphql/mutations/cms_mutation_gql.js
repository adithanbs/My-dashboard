import { gql } from '@apollo/client';

export const CREATE_USER_PROFILE_MUTATION = gql`
  mutation createUserProfile($profileData: UserProfileCreateInput!) {
    createUserProfile(data: $profileData) {
        profileImage {
          url
        }
    }
  }
`;

export const UPDATE_USER_PROFILE_MUTATION = gql`
  mutation updateUserProfile(
    $filter: UserProfileWhereUniqueInput!, 
    $profileData: UserProfileUpdateInput!) {
    updateUserProfile(where: $filter, data: $profileData) {
        profileImage {
          url
        }
    }
  }
`;
