import { gql } from "@apollo/client";

export const GET_FOODS_BY_CATEGORY = gql`
  query {
    meals(first: 50) {
      id
      title
      description
      category
      isDiscounted
      discountPercentage
      price
      slug
      image {
        url
      }
    }
  }
`;
