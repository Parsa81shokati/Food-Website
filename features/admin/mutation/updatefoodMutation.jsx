import { gql } from "@apollo/client";

export const UPDATE_FOOD = gql`
  mutation UpdateFood(
    $id: ID!
    $title: String!
    $description: String
    $price: Float!
    $isDiscounted: Boolean!
    $discountPercentage: Float!
  ) {
    updateMeal(
      where: { id: $id }
      data: {
        title: $title
        description: $description
        price: $price
        isDiscounted: $isDiscounted
        discountPercentage: $discountPercentage
      }
    ) {
      id
      title
      price
    }
  }
`;
