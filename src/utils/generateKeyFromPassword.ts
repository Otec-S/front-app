export const generateKeyFromPassword = async (
  password: string,
): Promise<string> => {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const encoder = new TextEncoder();

  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"],
  );

  const derivedKey = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt"],
  );

  const keyBuffer = await window.crypto.subtle.exportKey("raw", derivedKey);
  return btoa(String.fromCharCode(...new Uint8Array(keyBuffer)));
};
