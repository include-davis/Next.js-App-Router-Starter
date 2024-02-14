import styles from './page.module.scss';

import UsersList from './_components/UsersList/UsersList';
import CreateUserForm from './_components/CreateUsersForm/CreateUsersForm';

export default function User() {
  return (
    <div className={styles.body}>
      <h1>Test out some of our APIs</h1>
      <CreateUserForm />
      <UsersList />
    </div>
  );
}
