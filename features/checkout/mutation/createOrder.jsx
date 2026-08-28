import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $peopleId: ID!
    $orderNumber: String!
    $shippingCost: Float!
    $subtotal: Float!
    $totalPrice: Float!
    $customerName: String!
    $customerPhone: String!
    $address: String!
    $notes: String!
    $items: [OrderItemCreateInput!]!
    $expiresAt: DateTime!
  ) {
    createOrder(
      data: {
        orderNumber: $orderNumber
        shippingCost: $shippingCost
        subtotal: $subtotal
        totalPrice: $totalPrice
        customerName: $customerName
        customerPhone: $customerPhone
        address: $address
        notes: $notes
        paymentStatus: pending
        orderStatus: pending
        expiresAt: $expiresAt
        people: { connect: { id: $peopleId } }
        orderItems: { create: $items }
      }
    ) {
      id
      orderItems {
        id
      }
    }
  }
`;

export const PUBLISH_ORDER = gql`
  mutation PublishOrder($id: ID!) {
    publishOrder(where: { id: $id }) {
      id
    }
  }
`;

export const PUBLISH_ORDERITEM = gql`
  mutation PublishOrderItem($id: ID!) {
    publishOrderItem(where: { id: $id }) {
      id
    }
  }
`;
