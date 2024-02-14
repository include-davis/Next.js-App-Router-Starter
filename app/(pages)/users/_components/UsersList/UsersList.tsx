import styles from './UsersList.module.scss';

import type User from '@datatypes/User';
import UserCard from '../UserCard/UserCard';
import { getClient } from '@utils/apollo/ApolloClient';
import { usersQuery } from '@graphql/queries/users';

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
