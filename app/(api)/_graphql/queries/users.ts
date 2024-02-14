import { gql } from '@apollo/client';

export const usersQuery = gql`
  query Users($ids: [ID]) {
    users(ids: $ids) {
      id
      name
    }
  }
`;
