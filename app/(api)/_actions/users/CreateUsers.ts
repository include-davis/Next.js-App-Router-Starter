'use server';

import { revalidatePath } from 'next/cache';
import { getClient } from '@utils/apollo/ApolloClient';
import FormToJSON from '@utils/form/FormToJSON';

import { gql } from '@apollo/client';

const createUserMutation = gql`
  mutation Mutation($input: UserInput!) {
    createUser(input: $input) {
      id
      name
    }
  }
`;

export async function CreateUser(formData: FormData) {
  const dataJSON = FormToJSON(formData);
  await getClient().mutate({
    mutation: createUserMutation,
    variables: {
      input: dataJSON,
    },
  });
  revalidatePath('/users');
}
