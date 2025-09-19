import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser(
    $phone: String!
    $lastName: String!
    $firstName: String!
  ) {
    createPeople(
      data: { phone: $phone, lastName: $lastName, firstName: $firstName }
    ) {
      id
      phone
      lastName
      firstName
    }
  }
`;
