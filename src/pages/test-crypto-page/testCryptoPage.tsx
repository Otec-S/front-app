import { FC, useEffect } from "react";
import { useEncrypt } from "../../utils/hooks/useEncrypt";
import { useDecrypt } from "../../utils/hooks/useDecrypt";
import { encryptionKey } from "../../utils/generateBase64Key";

const TestCryptoPage: FC = () => {
  // Шифрование
  const {
    encryptData,
    ciphertext,
    iv,
    error: encryptError,
  } = useEncrypt("Здавствуйте дорагая редакция", encryptionKey);

  // Расшифрование
  const {
    decryptData,
    plaintext,
    error: decryptError,
  } = useDecrypt(ciphertext || "", iv || "", encryptionKey);

  // Шифрование при монтировании компонента
  useEffect(() => {
    encryptData();
  }, []); // Переместите функцию из зависимостей, поскольку она мемоизируется и не должна изменяться

  // Расшифрование, когда ciphertext и iv доступны
  useEffect(() => {
    if (ciphertext && iv) {
      decryptData();
    }
  }, [ciphertext, iv, decryptData]); // Убедитесь, что decryptData также не меняется без необходимости

  return (
    <div>
      <h1>Шифрование и расшифрование</h1>

      {encryptError && <div>Ошибка шифрования: {encryptError}</div>}
      {decryptError && <div>Ошибка расшифровки: {decryptError}</div>}

      {ciphertext && <div>Зашифрованный текст: {ciphertext}</div>}
      {iv && <div>IV: {iv}</div>}
      {plaintext && <div>Расшифрованный текст: {plaintext}</div>}
    </div>
  );
};

export default TestCryptoPage;
