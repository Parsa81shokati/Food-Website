import { gql } from "@apollo/client";

export const UPDATE_USER_ROLE = gql`
  mutation UpdateRole($id: ID!, $role: String!) {
    updatePeople(where: { id: $id }, data: { role: $role }) {
      id

      role
    }
  }
`;

export const BLOCK_USER = gql`
  mutation UpdateRole($id: ID!, $isBlocked: Boolean!) {
    updatePeople(where: { id: $id }, data: { isBlocked: $isBlocked }) {
      id
    }
  }
`;
