import { gql } from '@apollo/client';

export const GET_Ticket_QUERY = gql`
query  getTicketList($customerId: Int!){
  getTicketList(customerId:$customerId) {
    ticketId
    paymentIntentId
    customerId
    amount
    currency
    description
    metadata
    receiptEmail
    created
  }
}

`


export const GET_CUSTOMERS_LIST = gql`
query getCustomersByPage ($pageRequest: PageRequest) {
  getCustomersByPage(pageRequest: $pageRequest) {
  pageData {
    customerId
    keycloakUserId
    firstName
    lastName
    email
    primaryContactNumber
    secondaryContactNumber
    whatsappNumber
    landlineNumber
    address {
      country {
        countryId
        countryName
      }
      state {
        stateId
        stateName
      }
      city {
        cityId
        cityName
      }
      addressLine1
      addressLine2
      postalCode
    }
    dateOfBirth
    lastLoginDate
    isFeaturedMember
    profileImageLink
    roleId
    statusId
    statusMessage
    termsConditionsAgreement
    termsConditionsDate
    panNumber
    aadhaarNumber
    nationalInsuranceNumber
    socialSecurityNumber
    passportNumber
    drivingLicenceNumber
    createdAt
    updatedBy
    updatedAt
  }
    recordsCount

  }
}
`


export const GET_COUNTRIES_QUERY = gql`
  query getCountries {
    getCountries {
      countryId
      countryName
      countryCode
      isdCode
    }
  }
`;

export const GET_STATES_QUERY = gql`
  query getStatesByCountry($countryId: ID!) {
    getStatesByCountry(countryId: $countryId) {
      stateId
      countryId
      stateName
    }
  }
`;

export const GET_CITIES_QUERY = gql`
  query getCitySuggestions($citySearchRequest: CitySearchRequest) {
    getCitySuggestions(citySearchRequest: $citySearchRequest) {
      cityId
      stateId
      stateName
      cityName
    }
  }
`;

export const GET_CUSTOMER_QUERY = gql`
  query getCustomers($customerId: ID!) {
    getCustomers(customerId: $customerId) {
      customerId
    keycloakUserId
    firstName
    lastName
    email
    primaryContactNumber
    secondaryContactNumber
    whatsappNumber
    landlineNumber
    address {
      country {
        countryId
        countryName
        countryCode
        isdCode
      }
      state {
        stateId
        countryId
        stateName
      }
      city {
        cityId
        stateId
        countryId
        cityName
      }
      addressLine1
      addressLine2
      postalCode
    }
    dateOfBirth
    lastLoginDate
    isFeaturedMember
    profileImageLink
    roleId
    statusId
    statusMessage
    termsConditionsAgreement
    termsConditionsDate
    panNumber
    aadhaarNumber
    nationalInsuranceNumber
    socialSecurityNumber
    passportNumber
    drivingLicenceNumber
    createdAt
    updatedBy
    updatedAt
    }
  }
`;
