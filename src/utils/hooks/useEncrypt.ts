import { useState } from "react";

export const useEncrypt = (plaintext: string, encryptionKey: string) => {
  const [ciphertext, setCiphertext] = useState<string | null>(null);
  const [iv, setIv] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const encryptData = async () => {
    try {
      const ivArray = window.crypto.getRandomValues(new Uint8Array(12));
      const ivBase64 = btoa(String.fromCharCode(...ivArray));
      const encodedPlaintext = new TextEncoder().encode(plaintext);
      const keyRaw = Uint8Array.from(window.atob(encryptionKey), (c) =>
        c.charCodeAt(0),
      );

      const secretKey = await window.crypto.subtle.importKey(
        "raw",
        keyRaw,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt"],
      );

      const encrypted = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv: ivArray },
        secretKey,
        encodedPlaintext,
      );

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

  return { ciphertext, iv, error, encryptData };
};
