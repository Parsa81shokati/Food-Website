import { gql } from "@apollo/client";

export const UPDATE_ORDER_PAYMENT_STATUS = gql`
  mutation UpdateOrder($id: ID!, $status: PaymentStatus!) {
    updateOrder(where: { id: $id }, data: { paymentStatus: $status }) {
      id
      paymentStatus
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
