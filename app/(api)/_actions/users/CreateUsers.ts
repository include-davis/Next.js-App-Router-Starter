'use server';

import { revalidatePath } from 'next/cache';
import { getClient } from '@utils/apollo/ApolloClient';
import FormToJSON from '@utils/form/FormToJSON';

import { createUserMutation } from '@graphql/mutations/createUser';

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
