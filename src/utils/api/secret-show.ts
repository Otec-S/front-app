import { BASE_URL } from "../constants";

export const secretShow = async (external_id: string) => {
  const token = sessionStorage.getItem("authToken");

  return await fetch(`${BASE_URL}/boxes/${external_id}/download/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error(error);
    });
};
