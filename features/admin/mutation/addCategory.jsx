import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation Createcategory($name: String!) {
    createCategory(data: { name: $name }) {
      id
    }
  }
`;
