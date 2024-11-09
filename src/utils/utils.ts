export function objectToFormData<T extends Record<string, any>>(
  obj: T
): FormData {
  const formData = new FormData();

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value); // Append files or blobs directly
    } else {
      formData.append(key, value.toString()); // Convert other values to strings
    }
  });

  return formData;
}

export function parseGeoLocation(geoLocation: string): [number, number][] {
  try {
    const coordinates = JSON.parse(geoLocation)[0].map((coord: any[]) => [
      coord[1],
      coord[0],
    ]);
    return coordinates;
  } catch (error) {
    return [];
  }
}
