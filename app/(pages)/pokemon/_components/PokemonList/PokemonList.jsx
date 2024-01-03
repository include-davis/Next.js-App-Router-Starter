import styles from './PokemonList.module.scss';

import PokemonCard from '../PokemonCard/PokemonCard';
export default async function PokemonList() {
  const res = await fetch('http://localhost:3000/api/pokemon');
  const pokemon = await res.json();
  return (
    <div className={styles.list_container}>
      {pokemon.body.map((pokemon, index) => (
        <PokemonCard key={index} pokemon={pokemon} />
      ))}
    </div>
  );
}
