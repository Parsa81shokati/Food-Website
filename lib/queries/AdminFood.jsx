import { gql } from "@apollo/client";

export const GET_FOOD_BY_ID = gql`
  query GetFoodById($id: ID!) {
    meal(where: { id: $id }) {
      id
      title
      description
      price
      isDiscounted
      discountPercentage
      category
      slug
      image {
        url
      }
    }
  }
`;
