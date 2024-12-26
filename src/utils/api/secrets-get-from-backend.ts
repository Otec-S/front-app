import { BASE_URL } from "../constants";

export const SecretsGetFromBackend = async () => {
  // Извлекаем токен из sessionStorage
  const token = sessionStorage.getItem("authToken");

  return await fetch(`${BASE_URL}/boxes/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.error(error);
    });
};
