// import { FC, useEffect, useState } from "react";
// import { useEncrypt } from "../../utils/hooks/useEncrypt";
// import { useDecrypt } from "../../utils/hooks/useDecrypt";
// import { generateKeyFromPassword } from "../../utils/generateKeyFromPassword";

// const TestCryptoPage: FC = () => {
//   const [encryptionKey, setEncryptionKey] = useState("");
//   const [error, setError] = useState("");

//   const handleGenerateKey = async (password: string) => {
//     try {
//       const key = await generateKeyFromPassword(password);
//       setEncryptionKey(key);
//     } catch (error) {
//       setError("Ошибка генерации ключа");
//       console.error("Error  key:", error);
//     }
//   };

//   const {
//     encryptData,
//     ciphertext,
//     iv,
//     error: encryptError,
//   } = useEncrypt(
//     "Все счастливые семьи похожи друг на друга, каждое несчастливое семейство несчастливо по-своему.",
//     encryptionKey,
//   );

//   const {
//     decryptData,
//     plaintext,
//     error: decryptError,
//   } = useDecrypt(ciphertext || "", iv || "", encryptionKey);

//   // Шифрование при изменении encryptionKey
//   useEffect(() => {
//     if (encryptionKey) {
//       encryptData();
//     }
//   }, [encryptionKey]);
//   // useEffect(() => {
//   //   encryptData();
//   // }, []);

//   // Расшифрование, когда ciphertext и iv доступны
//   useEffect(() => {
//     if (ciphertext && iv) {
//       decryptData();
//     }
//   }, [ciphertext, iv, decryptData]);

//   return (
//     <div>
//       <h1>Шифрование и расшифрование</h1>

//       <input
//         type="password"
//         onChange={(e) => handleGenerateKey(e.target.value)}
//         placeholder="Введите пароль"
//       />
//       {encryptionKey && <p>Generated Key: {encryptionKey}</p>}
//       {error && <p>{error}</p>}

//       {encryptError && <div>Ошибка шифрования: {encryptError}</div>}
//       {decryptError && <div>Ошибка расшифровки: {decryptError}</div>}

//       {ciphertext && <div>Зашифрованный текст: {ciphertext}</div>}
//       {iv && <div>IV: {iv}</div>}
//       {plaintext && <div>Расшифрованный текст: {plaintext}</div>}
//     </div>
//   );
// };

// export default TestCryptoPage;
