'use server';

import { revalidatePath } from 'next/cache';
import { getClient } from '@utils/apollo/ApolloClient';
import FormToJSON from '@utils/form/FormToJSON';

import { gql } from '@apollo/client';

const createUserMutation = gql`
  mutation CreatePlaylist($userId: ID!, $input: PlaylistInput!) {
    createPlaylist(userId: $userId, input: $input) {
      id
      name
      user {
        id
        name
      }
    }
  }
`;

export async function CreateUser(formData: FormData) {
  const dataJSON = FormToJSON(formData);
  await getClient().mutate({
    mutation: createUserMutation,
    variables: dataJSON,
  });
  revalidatePath('/users');
}
