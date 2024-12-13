import CryptoJS from "crypto-js";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

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

export const getTimeAgo = (date: Date | string): string => {
  const targetDate = new Date(date);
  const now = new Date();

  const seconds = differenceInSeconds(now, targetDate);
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }

  const minutes = differenceInMinutes(now, targetDate);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }

  const hours = differenceInHours(now, targetDate);
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  const days = differenceInDays(now, targetDate);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
};

// Helper function to check for valid non-empty values
export const isValidValue = (value: any) => value !== null && value !== undefined && value !== "";
