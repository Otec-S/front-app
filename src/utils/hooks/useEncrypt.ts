import { useState } from "react";

export const useEncrypt = (plaintext: string, encryptionKey: string) => {
  const [ciphertext, setCiphertext] = useState<string | null>(null);
  const [iv, setIv] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const encryptData = async () => {
    try {
      // Generate a random 12-byte initialization vector
      const ivArray = window.crypto.getRandomValues(new Uint8Array(12));
      // Convert the initialization vector to a base64-encoded string
      const ivBase64 = btoa(String.fromCharCode(...ivArray));
      // Encode the plaintext string to a Uint8Array
      const encodedPlaintext = new TextEncoder().encode(plaintext);
      // Decode the encryption key from a base64-encoded string to a Uint8Array
      const keyRaw = Uint8Array.from(window.atob(encryptionKey), (c) =>
        c.charCodeAt(0),
      );

      // Import the encryption key TODO: откуда?
      const secretKey = await window.crypto.subtle.importKey(
        "raw",
        keyRaw,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt"],
      );

      // Encrypt the plaintext
      const encrypted = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv: ivArray },
        secretKey,
        encodedPlaintext,
      );

      // Convert the encrypted data to a base64-encoded string
      setCiphertext(btoa(String.fromCharCode(...new Uint8Array(encrypted))));
      setIv(ivBase64);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  // Return the ciphertext, initialization vector, error, and encryptData function
  return { ciphertext, iv, error, encryptData };
};
