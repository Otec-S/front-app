import { BASE_URL } from "../constants";

export const secretDelete = async (external_id: string) => {
  const token = sessionStorage.getItem("authToken");

  return await fetch(`${BASE_URL}/boxes/${external_id}/`, {
    method: "DELETE",
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
