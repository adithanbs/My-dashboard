import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation signupMutation(
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $password: String!,
    $mobileCountryCode: String,
    $mobileNumber: String!,
    $whatsAppNumber: Boolean!,
    $originCountry: String,
    $originIp: String,
    $originSite: String!
  ) {
    createUser(
      user: {
        firstName: $firstName,
        lastName: $lastName,
        email: $email,
        password: $password, 
        mobileCountryCode: $mobileCountryCode,
        mobileNumber: $mobileNumber,
        whatsAppNumber: $whatsAppNumber,
        originCountry: $originCountry,
        originIp: $originIp,
        originSite: $originSite
      }
    )
  }
`;

export const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmailMutation($token: String!) {
    verifyEmail(token: $token)
  }
`;

export const RESEND_VERIFICATION_EMAIL_MUTATION = gql`
  mutation resendVerificationEmailMutation($email: String!) {
    resendVerificationEmail(email: $email)
  }
`;

export const UPDATE_USER_PROFILE_MUTATION = gql`
  mutation updateUserProfile($userProfile: UserProfile!) {
    resendVerificationEmail(userProfile: $userProfile)
  }
`;
export const REGISTER_MUTATION = gql`
mutation RegisterMutation($user: EventUser!) {
  createEventUser(user: $user)
}
`;

