type EncryptionResult = {
  ciphertext?: string;
  iv?: string;
  error?: string;
};

export const encryptText = async (
  plaintext: string,
  encryptionKey: string,
): Promise<EncryptionResult> => {
  if (!plaintext) {
    return { error: "Текст для шифрования не предоставлен" };
  }
  if (!encryptionKey) {
    return { error: "Ключ для шифрования не предоставлен" };
  }

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

    const ciphertext = btoa(String.fromCharCode(...new Uint8Array(encrypted)));

    return { ciphertext, iv: ivBase64 };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Неизвестная ошибка" };
    }
  }
};

// Пример использования
// const { ciphertext, iv, error } = await encrypt("ваш-текст", "ваш-ключ-шифрования");
