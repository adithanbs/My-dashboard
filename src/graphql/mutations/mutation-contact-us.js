import { gql } from '@apollo/client';


export const SAVE_CONTACT_US = gql`
mutation saveContactUs(
    $contactUs: ContactUsRequest
){
  saveContactUs(
    contactUs: $contactUs
  )
}
`