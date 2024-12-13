import { BASE_URL } from "../constants";

interface Props {
  email: string;
  password: string;
}
export const userRegistration = async ({ email, password }: Props) => {
  return await fetch(`${BASE_URL}/auth/users/`, {
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
