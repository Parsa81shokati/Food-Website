import { gql } from "@apollo/client";

export const GET_DISCOUNTED_FOODS = gql`
  query {
    meals(where: { isDiscounted: true }) {
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
