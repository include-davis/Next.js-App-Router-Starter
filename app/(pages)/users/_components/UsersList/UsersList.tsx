import styles from './UsersList.module.scss';

import type User from '@datatypes/User';
import UserCard from '../UserCard/UserCard';

import { gql } from '@apollo/client';
import { getClient } from '@utils/apollo/ApolloClient';

const usersQuery = gql`
  query Users($ids: [ID]) {
    users(ids: $ids) {
      id
      name
    }
  }
`;

export default async function UsersList() {
  const users = await getClient().query({
    query: usersQuery,
  });
  return (
    <div className={styles.list_container}>
      {users.data.users.map((user: User, index: number) => (
        <UserCard key={index} user={user} />
      ))}
    </div>
  );
}
