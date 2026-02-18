import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  query {
    orders {
      address
      id
      notes
      orderNumber
      orderStatus
      paymentStatus
      totalPrice
      orderItems {
        id
        price
        quantity
        meal {
          title
          id
        }
      }
      people {
        firstName
        id
        lastName
        phone
      }
    }
  }
`;
