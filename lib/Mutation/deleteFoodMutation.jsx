import { gql } from "@apollo/client";

export const UPDATE_FOOD = gql`
  mutation UpdateFood($id: ID!) {
    updateMeal(where: { id: $id }, data: { isDeleted: true }) {
      id
    }
  }
`;
