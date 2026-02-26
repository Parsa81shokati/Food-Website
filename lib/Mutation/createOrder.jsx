import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $peopleId: ID!
    $orderNumber: String!
    $totalPrice: Float!
    $address: String!
    $notes: String
    $items: [OrderItemCreateInput!]!
  ) {
    createOrder(
      data: {
        orderNumber: $orderNumber
        totalPrice: $totalPrice
        address: $address
        notes: $notes
        paymentStatus: pending
        orderStatus: pending
        people: { connect: { id: $peopleId } }
        orderItems: { create: $items }
      }
    ) {
      id
    }
  }
`;
