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

// interface IAutorizationUser {
//   password: string;
//   email: string;
// }
// export const autorizationUser = async ({
//   password,
//   email,
// }: IAutorizationUser) => {
//   return await fetch(`${BASE_URL}/auth/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       password,
//       email,
//     }),
//   }).then(async (res) => await handleResponse(res));
// };
// export const logoutUser = async () => {
//   return await fetch(`${BASE_URL}/auth/logout`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       token: localStorage.refreshToken,
//     }),
//   }).then(async (res) => await handleResponse(res));
// };
// export const refreshToken = async () => {
//   return await fetch(`${BASE_URL}/auth/token`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       token: localStorage.refreshToken,
//     }),
//   }).then(async (res) => await handleResponse(res));
// };
// export const getUser = async () => {
//   return await fetch(`${BASE_URL}/auth/user`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${getCookie("token")}`,
//     },
//   }).then(async (res) => await handleResponse(res));
// };
// interface IUpdateUser {
//   email: string;
//   password: string;
//   name: string;
// }
// export const updateUser = async ({ email, password, name }: IUpdateUser) => {
//   return await fetch(`${BASE_URL}/auth/user`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${getCookie("token")}`,
//     },
//     body: JSON.stringify({
//       email,
//       password,
//       name,
//     }),
//   }).then(async (res) => await handleResponse(res));
// };
