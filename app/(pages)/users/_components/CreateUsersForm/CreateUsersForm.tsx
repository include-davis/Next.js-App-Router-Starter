import styles from './CreatePlaylistForm.module.scss';

import { CreateUser } from '@actions/playlists/CreateUsers';
export default function CreateUserForm() {
  return (
    <div className={styles.form_container}>
      <h3>Create Playlist</h3>
      <form action={CreateUser}>
        <div>
          <label>name</label>
          <input name="name" type="text"></input>
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}
