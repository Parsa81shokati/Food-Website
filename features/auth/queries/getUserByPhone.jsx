import { gql } from "@apollo/client";

export const GET_USER_BY_PHONE = gql`
  query GetUserByPhone($phone: String!) {
    peoples(where: { phone: $phone }) {
      id
      phone
      firstName
      lastName
    }
  }
`;
