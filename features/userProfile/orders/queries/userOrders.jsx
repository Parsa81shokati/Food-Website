import { gql } from "@apollo/client";

export const GET_USER_ORDERS = gql`
  query GetUserOrders($userId: ID!) {
    orders(where: { people: { id: $userId }, paymentStatus: paid }) {
      id
      address
      customerName
      customerPhone
      deliveredAt
      notes
      orderNumber
      orderStatus
      paymentStatus
      shippingCost
      discountAmount
      totalPrice
      orderItems {
        meal {
          id
          title
          discountPercentage
          price
          image {
            url
          }
        }
        quantity
        price
      }
    }
  }
`;
