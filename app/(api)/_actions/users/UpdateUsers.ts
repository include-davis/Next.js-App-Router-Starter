'use server';

import { revalidatePath } from 'next/cache';
import { getClient } from '@utils/apollo/ApolloClient';
import FormToJSON from '@utils/form/FormToJSON';

import { updateUserMutation } from '@graphql/mutations/updateUser';

export async function UpdateUser(id: string, formData: FormData) {
  const dataJSON = FormToJSON(formData);
  await getClient().mutate({
    mutation: updateUserMutation,
    variables: {
      updateUserId: id,
      input: dataJSON,
    },
  });
  revalidatePath('/users');
}
