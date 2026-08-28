import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
  mutation UpdatePeople($id: ID!, $firstName: String!, $lastName: String!) {
    updatePeople(
      where: { id: $id }
      data: { firstName: $firstName, lastName: $lastName }
    ) {
      id
      firstName
      lastName
      phone
    }

    publishPeople(where: { id: $id }) {
      id
    }
  }
`;
