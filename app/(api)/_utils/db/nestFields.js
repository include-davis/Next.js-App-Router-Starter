export function renameField(jsonObject, oldFieldName, newFieldName) {
  if (jsonObject.hasOwnProperty(oldFieldName)) {
    // Create a new object with the renamed field
    const renamedObject = {
      ...jsonObject,
      [newFieldName]: jsonObject[oldFieldName],
    };

    // Delete the old field
    delete renamedObject[oldFieldName];

    return renamedObject;
  }

  // Return the original object if the old field doesn't exist
  return jsonObject;
}

export function nestField(jsonObject, field, nesting) {
  return renameField(jsonObject, field, `${nesting}${field}`);
}

export function nestAllFields(jsonObject, nesting) {
  for (const key of Object.keys(jsonObject)) {
    jsonObject = nestField(jsonObject, key, nesting);
  }
  return jsonObject;
}

export function nestAllUpdaters(jsonObject, nesting) {
  for (const [key, val] of Object.entries(jsonObject)) {
    jsonObject[key] = nestAllFields(val, nesting);
  }
  return jsonObject;
}
