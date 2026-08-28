import { gql } from "@apollo/client";

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $name: String!, $slug: String!) {
    updateMeal(where: { id: $id }, data: { name: $name, slug: $slug }) {
      id
    }
  }
`;
