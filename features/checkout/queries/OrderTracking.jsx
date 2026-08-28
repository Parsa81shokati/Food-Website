import { gql } from "@apollo/client";

export const GET_ORDER = gql`
  query GetOrder($id: ID!) {
    order(where: { id: $id }) {
      id
      orderNumber
      orderStatus
      paymentStatus
      customerName
      customerPhone
      totalPrice
      subtotal
      shippingCost
      discountAmount
      address
      notes
      createdAt
      orderItems {
        id
        quantity
        price
        meal {
          id
          title
          image {
            url
          }
          price
        }
      }

      people {
        id
        firstName
        lastName
        phone
      }
    }
  }
`;
