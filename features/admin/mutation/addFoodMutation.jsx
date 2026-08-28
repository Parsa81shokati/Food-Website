import { gql } from "@apollo/client";

export const CREATE_Food = gql`
  mutation CreateMeal(
    $title: String!
    $description: String!
    $price: Float!
    $category: String!
    $isDiscounted: Boolean!
    $discountPercentage: Float!
  ) {
    createMeal(
      data: {
        title: $title
        description: $description
        price: $price
        category: $category
        isDiscounted: $isDiscounted
        discountPercentage: $discountPercentage
      }
    ) {
      id
      title
    }
  }
`;
