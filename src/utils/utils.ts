import CryptoJS from "crypto-js";

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

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || "default_secret_key";

export const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const decryptData = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
