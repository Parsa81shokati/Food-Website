import { gql } from "@apollo/client";

export const GET_FOOD_BY_SLUG = gql`
  query GetFoodBySlug($slug: String!) {
    meal(where: { slug: $slug }) {
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
      comments {
        authorName
        createdAt
        id
        comment {
          text
        }
        rating
      }
    }
  }
`;
