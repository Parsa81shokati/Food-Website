import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    peoples {
      id
      firstName
      lastName
      phone
      role
      isBlocked
    }
  }
`;
