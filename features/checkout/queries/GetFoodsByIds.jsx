import { gql } from "@apollo/client";

export const GET_FOODS_BY_IDS = gql`
  query GetFoodsByIds($ids: [ID!]) {
    meals(where: { id_in: $ids }) {
      id
      title
      price
      isDiscounted
      discountPercentage
    }
  }
`;
