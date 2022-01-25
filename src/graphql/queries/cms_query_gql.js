import { gql } from '@apollo/client';

export const FETCH_USER_PROFILE_QUERY = gql`
  query userProfile($filter: UserProfileWhereUniqueInput!) {
    userProfile(where: $filter) {
        profileImage {
          url
        }
    }
  }
`;

export const FETCH_BLOGS = gql`
  query blogs($take: Int){
    blogs(take: $take){
        id
        title
        author {
          name
        }
        description
        content {
          document
        }
      tags
      featureImage {
        url
      }
      articleType
      publishDate
    }
  }
`;
