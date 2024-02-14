import styles from './PokemonCard.module.scss';
import { UpdateUser } from '@actions/playlists/UpdateUsers';

export default function PokemonCard({ user }: { user: User }) {
  const UpdatePokemonWithId = UpdateUser.bind(null, user._id);
  return (
    <div className={styles.container}>
      <h3 className={styles.subtitle}>USERNAME</h3>
      <p>{user.name}</p>
      <hr />
      <form action={UpdatePokemonWithId}>
        <h3>Rename form</h3>
        <div>
          <label>New name</label>
          <input name="name" type="text"></input>
        </div>
        <button type="submit">{`Update ${user.name}`}</button>
      </form>
    </div>
  );
}
