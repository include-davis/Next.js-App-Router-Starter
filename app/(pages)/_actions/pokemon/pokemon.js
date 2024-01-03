'use server';

import { revalidatePath } from 'next/cache';
import FormToJSON from '../_utils/FormToJSON';

export async function CreatePokemon(formData) {
  const dataJSON = FormToJSON(formData);
  await fetch('http://localhost:3000/api/pokemon', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataJSON),
  });
  revalidatePath('/pokemon');
}

export async function UpdatePokemon(id, formData) {
  const dataJSON = FormToJSON(formData);
  await fetch(`http://localhost:3000/api/pokemon/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      $set: dataJSON,
    }),
  });
  revalidatePath('/pokemon');
}
