import React, { useEffect, useState } from "react";

interface DecryptProps {
  ciphertext: string;
  iv: string;
  encryptionKey: string;
}

export const decryptSymmetric = async (
  ciphertext: string,
  iv: string,
  key: string,
) => {
  try {
    // Подготовка секретного ключа
    const secretKey = await window.crypto.subtle.importKey(
      "raw",
      Uint8Array.from(window.atob(key), (c) => c.charCodeAt(0)),
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"],
    );

    // Расшифровка зашифрованного текста "ciphertext" с помощью секретного ключа и IV
    const cleartext = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: Uint8Array.from(window.atob(iv), (c) => c.charCodeAt(0)),
      },
      secretKey,
      Uint8Array.from(window.atob(ciphertext), (c) => c.charCodeAt(0)),
    );

    // Расшифрованный текст
    return new TextDecoder().decode(cleartext);
  } catch (error) {
    console.error("Ошибка при расшифровке", error);
    throw new Error("Расшифровка не удалась.");
  }
};

export const Decrypt: React.FC<DecryptProps> = ({
  ciphertext,
  iv,
  encryptionKey,
}) => {
  const [plaintext, setPlaintext] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const decryptData = async () => {
      try {
        const decryptedText = await decryptSymmetric(
          ciphertext,
          iv,
          encryptionKey,
        );
        setPlaintext(decryptedText);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message); // Используем свойство message
        } else {
          setError("Неизвестная ошибка"); // На случай, если ошибка не является экземпляром Error
        }
      }
    };

    decryptData();
  }, [ciphertext, iv, encryptionKey]);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (plaintext === null) {
    return <div>Расшифровка...</div>;
  }

  return (
    <div>
      <div>Расшифрованный текст: {plaintext}</div>
    </div>
  );
};
