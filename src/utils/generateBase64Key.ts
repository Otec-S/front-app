const generateBase64Key = (): string => {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
};

// Пример использования
export const encryptionKey = generateBase64Key();
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
