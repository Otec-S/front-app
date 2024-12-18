import { FC, useEffect, useState } from "react";

interface Props {
  plaintext: string;
  // encryptionKey: string;
}

interface Result {
  ciphertext: string;
  iv: string;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

const generateBase64Key = (): string => {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
};

// Пример использования
const encryptionKey = generateBase64Key();
console.log("Generated Base64 Key:", encryptionKey);

// Проверка корректности Base64
if (
  !/^[A-Za-z0-9+/=]+$/.test(encryptionKey) ||
  encryptionKey.length % 4 !== 0
) {
  console.error("Generated key is not valid Base64.");
} else {
  console.log("Generated key is valid Base64.");
}

export const Encrypt: FC<Props> = ({ plaintext }) => {
  const [encryptionResult, setEncryptionResult] = useState<Result | null>(null);

  useEffect(() => {
    const encryptData = async () => {
      try {
        // Проверка: Валидность строки Base64
        if (
          !/^[A-Za-z0-9+/=]*$/.test(encryptionKey.trim()) ||
          encryptionKey.trim().length % 4 !== 0
        ) {
          throw new Error(
            "Encryption key is not a valid Base64 encoded string.",
          );
        }

        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const encodedPlaintext = new TextEncoder().encode(plaintext);
        const keyRaw = Uint8Array.from(window.atob(encryptionKey.trim()), (c) =>
          c.charCodeAt(0),
        );
        const secretKey = await window.crypto.subtle.importKey(
          "raw",
          keyRaw,
          {
            name: "AES-GCM",
            length: 256,
          },
          true,
          ["encrypt", "decrypt"],
        );
        const ciphertext = await window.crypto.subtle.encrypt(
          {
            name: "AES-GCM",
            iv,
          },
          secretKey,
          encodedPlaintext,
        );
        setEncryptionResult({
          ciphertext: arrayBufferToBase64(ciphertext),
          iv: arrayBufferToBase64(iv.buffer),
        });
      } catch (error) {
        console.error("Ошибка при шифровании", error);
      }
    };
    encryptData();
  }, [plaintext, encryptionKey]);

  console.log("Encryption Key:", encryptionKey);
  console.log("Trimmed Encryption Key:", encryptionKey.trim());
  console.log("Key Length:", encryptionKey.length);

  if (!encryptionResult) return <div>Шифрование...</div>;

  return (
    <div>
      <div>Зашифрованный текст: {encryptionResult.ciphertext}</div>
      <div>IV: {encryptionResult.iv}</div>
    </div>
  );
};
