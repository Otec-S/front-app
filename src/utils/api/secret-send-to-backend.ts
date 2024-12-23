import { BASE_URL } from "../constants";

export const secretSendToBackend = async (
  receiverName: string,
  receiverEmail: string,
  encryptedText: string,
) => {
  // Создаем Blob из строки, указывая MIME-тип, если необходимо
  const blob = new Blob([encryptedText], { type: "text/plain" });

  // Если необходимо, можно создать объект File, указав имя файла
  const file = new File([blob], "secretfile.txt", { type: "text/plain" });

  // Создаем объект FormData
  const formData = new FormData();

  // FormData
  formData.append("recipient.name", receiverName);
  formData.append("recipient.email", receiverEmail);
  formData.append("content", file);

  // Извлекаем токен из sessionStorage
  const token = sessionStorage.getItem("authToken");

  return await fetch(`${BASE_URL}/boxes/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.error(error);
    });
};
