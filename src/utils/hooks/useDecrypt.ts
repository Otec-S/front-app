import { useState } from "react";

export const useDecrypt = (
  ciphertext: string,
  iv: string,
  encryptionKey: string,
) => {
  const [plaintext, setPlaintext] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const decryptData = async () => {
    try {
      const keyRaw = Uint8Array.from(window.atob(encryptionKey), (c) =>
        c.charCodeAt(0),
      );
      const secretKey = await window.crypto.subtle.importKey(
        "raw",
        keyRaw,
        { name: "AES-GCM", length: 256 },
        true,
        ["decrypt"],
      );

      const ivArray = Uint8Array.from(atob(iv), (c) => c.charCodeAt(0));
      const decrypted = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv: ivArray },
        secretKey,
        Uint8Array.from(atob(ciphertext), (c) => c.charCodeAt(0)),
      );

      setPlaintext(new TextDecoder().decode(decrypted));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return { plaintext, error, decryptData };
};
