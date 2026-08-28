import { gql } from "@apollo/client";

export const GET_PENDING_ORDER = gql`
  query GetPendingOrder($userId: ID!) {
    orders(
      where: { people: { id: $userId }, paymentStatus: pending }
      first: 1
      orderBy: createdAt_DESC
    ) {
      id
      totalPrice
      paymentStatus
      createdAt
    }
  }
`;
