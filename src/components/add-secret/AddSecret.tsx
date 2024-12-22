import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { FC, useEffect, useState } from "react";

import styles from "./AddSecret.module.css";
import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { generateKeyFromPassword } from "../../utils/generateKeyFromPassword";
import { useEncrypt } from "../../utils/hooks/useEncrypt";

interface Props {
  onCancelAdd: () => void;
}

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const AddSecretContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

const AddSecret: FC<Props> = ({ onCancelAdd }) => {
  const [secretNameError, setSecretNameError] = useState(false);
  const [secretNameErrorMessage, setSecretNameErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [secretTextError, setSecretTextError] = useState(false);
  const [secretTextErrorMessage, setSecretTextErrorMessage] = useState("");
  const [secretPasswordError, setSecretPasswordError] = useState(false);
  const [secretPasswordErrorMessage, setSecretPasswordErrorMessage] =
    useState("");
  const [repeatSecretPasswordError, setRepeatSecretPasswordError] =
    useState(false);
  const [
    repeatSecretPasswordErrorMessage,
    setRepeatSecretPasswordErrorMessage,
  ] = useState("");

  const [showSecretPassword, setShowSecretPassword] = useState(false);
  const [showRepeatSecretPassword, setShowRepeatSecretPassword] =
    useState(false);

  // TODO:
  const [password, setPassword] = useState("");
  const [initialText, setInitialText] = useState("");
  console.log("initialText:", initialText);
  const [encryptionKey, setEncryptionKey] = useState("");
  // TODO: выведи в подсказку пользователю, еси ошибка эта
  const [encryptionKeyError, setEncryptionKeyError] = useState("");

  const handleGenerateKey = async (password: string) => {
    try {
      const key = await generateKeyFromPassword(password);
      setEncryptionKey(key);
      console.log("Ключ шифрования из пароля:", key);
    } catch (error) {
      setEncryptionKeyError("Ошибка генерации ключа");
      console.log("Error generating key:", error);
    }
  };

  const {
    encryptData,
    ciphertext,
    iv,
    error: encryptError,
  } = useEncrypt(initialText, encryptionKey);

  // Шифрование при изменении encryptionKey
  // useEffect(() => {
  //   if (encryptionKey) {
  //     encryptData();
  //     console.log("ciphertext:", ciphertext);
  //   }
  // }, [encryptionKey]);

  useEffect(() => {
    const processEncryption = async () => {
      if (encryptionKey && initialText) {
        try {
          // Ждем завершения шифрования
          await encryptData(); // Предполагается, что encryptData возвращает промис

          // Теперь можно безопасно использовать ciphertext
          console.log("ciphertext:", ciphertext);
          // await sendEncryptedData(ciphertext); // Отправка зашифрованного текста на сервер
        } catch (error) {
          console.error("Ошибка при шифровании или отправке данных:", error);
        }
      }
    };

    processEncryption(); // Вызов функции
  }, [encryptionKey, initialText]);

  const handleClickShowSecretPassword = () =>
    setShowSecretPassword((show) => !show);
  const handleClickShowRepeatSecretPassword = () =>
    setShowRepeatSecretPassword((show) => !show);

  const validateInputs = () => {
    const secretName = document.getElementById(
      "secretName",
    ) as HTMLInputElement;
    const email = document.getElementById("receiverEmail") as HTMLInputElement;
    const text = document.getElementById("secretText") as HTMLInputElement;
    const secretPassword = document.getElementById(
      "secretPassword",
    ) as HTMLInputElement;
    const repeatSecretPassword = document.getElementById(
      "repeatSecretPassword",
    ) as HTMLInputElement;

    let isValid = true;

    if (!secretName.value) {
      setSecretNameError(true);
      setSecretNameErrorMessage("Введите наименование секрета");
      isValid = false;
    } else {
      setSecretNameError(false);
      setSecretNameErrorMessage("");
    }
    if (!text.value) {
      setSecretTextError(true);
      setSecretTextErrorMessage("Введите текст секрета");
      isValid = false;
    } else {
      setSecretTextError(false);
      setSecretTextErrorMessage("");
    }
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Введите корректный email");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!secretPassword.value) {
      setSecretPasswordError(true);
      setSecretPasswordErrorMessage("Введите пароль для секрета");
      isValid = false;
    } else {
      setSecretPasswordError(false);
      setSecretPasswordErrorMessage("");
    }

    if (!repeatSecretPassword.value) {
      setRepeatSecretPasswordError(true);
      setRepeatSecretPasswordErrorMessage("Повторите пароль для секрета");
      isValid = false;
    } else if (secretPassword.value !== repeatSecretPassword.value) {
      setRepeatSecretPasswordError(true);
      setRepeatSecretPasswordErrorMessage("Пароли не совпадают");
      isValid = false;
    } else {
      setRepeatSecretPasswordError(false);
      setRepeatSecretPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleButtonClick = () => {
    if (validateInputs()) {
      // Валидация полей перед генерацией ключа
      handleGenerateKey(password); // Используйте текущее значение состояния
    }
  };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   if (emailError || passwordError) {
  //     return;
  //   }

  //   const data = new FormData(event.currentTarget);
  //   const email = data.get("email")?.toString().trim() ?? "";
  //   const password = data.get("password")?.toString().trim() ?? "";

  //   try {
  //     setLoading(true);
  //     const res = await userAuthorization({ email, password });
  //     console.log("res:", res);
  //     if (res.error === "internal_server_error") {
  //       showAlert("error", "Что-то пошло не так!", "Ошибка сервера");
  //     } else if (res.error === "Unauthorized") {
  //       showAlert("error", "Что-то пошло не так!", "Неверные логин или пароль");
  //     } else if (res.access) {
  //       localStorage.setItem("authToken", res.access);
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.error("Ошибка в handleSubmit:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <AddSecretContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Добавление секрета
          </Typography>

          <Box
            component="form"
            // onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="secretName">Название секрета</FormLabel>
              <TextField
                fullWidth
                autoFocus
                id="secretName"
                name="secretName"
                variant="outlined"
                error={secretNameError}
              />
              <div className={styles.placeForErrMassage}>
                {secretNameError ? secretNameErrorMessage : ""}
              </div>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="receiverEmail">Email получателя</FormLabel>
              <TextField
                fullWidth
                id="receiverEmail"
                name="receiverEmail"
                variant="outlined"
                error={emailError}
              />
              <div className={styles.placeForErrMassage}>
                {emailError ? emailErrorMessage : ""}
              </div>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="secretText">Текст секрета</FormLabel>
              <TextField
                fullWidth
                multiline={true}
                id="secretText"
                name="secretText"
                variant="outlined"
                error={secretTextError}
                onChange={(e) => setInitialText(e.target.value)}
                // sx={{ minHeight: "200px" }}
              />
              <div className={styles.placeForErrMassage}>
                {secretTextError ? secretTextErrorMessage : ""}
              </div>
            </FormControl>
            <FormLabel
              htmlFor="secretPassword"
              style={{ marginBottom: "-9px" }}
            >
              Пароль для секрета
            </FormLabel>
            <FormControl error={secretPasswordError}>
              <OutlinedInput
                fullWidth
                name="secretPassword"
                id="secretPassword"
                type={showSecretPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showSecretPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowSecretPassword}
                      edge="end"
                    >
                      {showSecretPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <div className={styles.placeForErrMassage}>
                {secretPasswordError ? secretPasswordErrorMessage : ""}
              </div>
            </FormControl>
            <FormLabel
              htmlFor="repeatSecretPassword"
              style={{ marginBottom: "-9px" }}
            >
              Повторите пароль для секрета
            </FormLabel>
            <FormControl error={repeatSecretPasswordError}>
              <OutlinedInput
                fullWidth
                name="repeatSecretPassword"
                id="repeatSecretPassword"
                onChange={(e) => setPassword(e.target.value)}
                type={showRepeatSecretPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showRepeatSecretPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowRepeatSecretPassword}
                      edge="end"
                    >
                      {showRepeatSecretPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <div className={styles.placeForErrMassage}>
                {repeatSecretPasswordError
                  ? repeatSecretPasswordErrorMessage
                  : ""}
              </div>
            </FormControl>
            <LoadingButton
              // type="submit"
              variant="contained"
              fullWidth
              color="primary"
              onClick={handleButtonClick}
              // loading={loading}
            >
              Добавить секрет
            </LoadingButton>
            <Button variant="outlined" fullWidth onClick={onCancelAdd}>
              Отмена
            </Button>
          </Box>
        </Card>
      </AddSecretContainer>
    </>
  );
};
export default AddSecret;
