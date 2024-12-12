import { BASE_URL } from "../constants";

interface Props {
  email: string;
  password: string;
}

export const userAuthorization = async ({ email, password }: Props) => {
  return await fetch(`${BASE_URL}/auth/jwt/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.error(error);
    });
};
