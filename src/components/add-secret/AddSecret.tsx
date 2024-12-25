import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { FC, useRef, useState } from "react";

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
import { secretSendToBackend } from "../../utils/api/secret-send-to-backend";
import { encryptText } from "../../utils/encryptText";

interface Props {
  onCancelAdd: () => void;
}

interface Errors {
  receiverNameError: string;
  emailError: string;
  secretTitleError: string;
  secretTextError: string;
  secretPasswordError: string;
  repeatSecretPasswordError: string;
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
  const [errors, setErrors] = useState<Errors>({
    receiverNameError: "",
    emailError: "",
    secretTitleError: "",
    secretTextError: "",
    secretPasswordError: "",
    repeatSecretPasswordError: "",
  });

  const receiverNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const secretTitleRef = useRef<HTMLInputElement>(null);
  const secretTextRef = useRef<HTMLInputElement>(null);
  const secretPasswordRef = useRef<HTMLInputElement>(null);
  const repeatSecretPasswordRef = useRef<HTMLInputElement>(null);

  const [showSecretPassword, setShowSecretPassword] = useState(false);
  const [showRepeatSecretPassword, setShowRepeatSecretPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [initialText, setInitialText] = useState("");

  const handleGenerateKeyAndEncryptText = async (password: string) => {
    try {
      const key = await generateKeyFromPassword(password);
      const { ciphertext, error } = await encryptText(initialText, key);

      if (error) {
        console.error("Ошибка шифрования:", error);
        return { success: false, error };
      }

      return { success: true, ciphertext };
    } catch (error) {
      console.log("Error generating key:", error);
      return { success: false, error };
    }
  };

  const handleClickShowSecretPassword = () =>
    setShowSecretPassword((show) => !show);
  const handleClickShowRepeatSecretPassword = () =>
    setShowRepeatSecretPassword((show) => !show);

  // валидация полей
  const validateInputs = (): boolean => {
    let isValid = true;

    const receiverName = receiverNameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const secretTitle = secretTitleRef.current?.value || "";
    const secretText = secretTextRef.current?.value || "";
    const secretPassword = secretPasswordRef.current?.value || "";
    const repeatSecretPassword = repeatSecretPasswordRef.current?.value || "";

    const newErrors: Errors = {
      receiverNameError: "",
      emailError: "",
      secretTitleError: "",
      secretTextError: "",
      secretPasswordError: "",
      repeatSecretPasswordError: "",
    };

    if (!receiverName) {
      newErrors.receiverNameError = "Введите имя получателя";
      isValid = false;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.emailError = "Введите корректный email";
      isValid = false;
    }

    if (!secretTitle) {
      newErrors.secretTitleError = "Введите наименование секрета";
      isValid = false;
    }

    if (!secretText) {
      newErrors.secretTextError = "Введите текст секрета";
      isValid = false;
    }

    if (!secretPassword) {
      newErrors.secretPasswordError = "Введите пароль для секрета";
      isValid = false;
    }

    if (!repeatSecretPassword) {
      newErrors.repeatSecretPasswordError = "Повторите пароль для секрета";
      isValid = false;
    } else if (secretPassword !== repeatSecretPassword) {
      newErrors.repeatSecretPasswordError = "Пароли не совпадают";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // отправка секрета
  const handleSecretSubmit = async (
    event: React.MouseEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (validateInputs()) {
      const result = await handleGenerateKeyAndEncryptText(
        secretPasswordRef.current?.value || "",
      );

      if (!result.success) {
        console.error("Ошибка при генерации ключа шифрования:", result.error);
        return;
      }

      try {
        setLoading(true);
        if (result.ciphertext) {
          const res = await secretSendToBackend(
            receiverNameRef.current?.value || "",
            emailRef.current?.value || "",
            result.ciphertext,
          );
          console.log("Oтвет сервера на секрет:", res);
        }
      } catch (error) {
        console.error("Ошибка при шифровании или отправке данных:", error);
      } finally {
        setLoading(false);
      }
    }
  };

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
            onSubmit={handleSecretSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="receiverName">Имя получателя</FormLabel>
              <TextField
                fullWidth
                autoFocus
                inputRef={receiverNameRef}
                id="receiverName"
                name="receiverName"
                variant="outlined"
                error={!!errors.receiverNameError}
              />
              <div className={styles.placeForErrMassage}>
                {errors.receiverNameError}
              </div>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="secretTitle">Название секрета</FormLabel>
              <TextField
                fullWidth
                inputRef={secretTitleRef}
                id="secretTitle"
                name="secretTitle"
                variant="outlined"
                error={!!errors.secretTitleError}
              />
              <div className={styles.placeForErrMassage}>
                {errors.secretTitleError}
              </div>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="receiverEmail">Email получателя</FormLabel>
              <TextField
                fullWidth
                inputRef={emailRef}
                id="receiverEmail"
                name="receiverEmail"
                variant="outlined"
                error={!!errors.emailError}
              />
              <div className={styles.placeForErrMassage}>
                {errors.emailError}
              </div>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="secretText">Текст секрета</FormLabel>
              <TextField
                fullWidth
                inputRef={secretTextRef}
                multiline={true}
                id="secretText"
                name="secretText"
                variant="outlined"
                error={!!errors.secretTextError}
                onChange={(e) => setInitialText(e.target.value)}
              />
              <div className={styles.placeForErrMassage}>
                {errors.secretTextError}
              </div>
            </FormControl>
            <FormLabel
              htmlFor="secretPassword"
              style={{ marginBottom: "-9px" }}
            >
              Пароль для секрета
            </FormLabel>
            <FormControl error={!!errors.secretPasswordError}>
              <OutlinedInput
                fullWidth
                name="secretPassword"
                inputRef={secretPasswordRef}
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
                {errors.secretPasswordError}
              </div>
            </FormControl>
            <FormLabel
              htmlFor="repeatSecretPassword"
              style={{ marginBottom: "-9px" }}
            >
              Повторите пароль для секрета
            </FormLabel>
            <FormControl error={!!errors.repeatSecretPasswordError}>
              <OutlinedInput
                fullWidth
                inputRef={repeatSecretPasswordRef}
                name="repeatSecretPassword"
                id="repeatSecretPassword"
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
                {errors.repeatSecretPasswordError}
              </div>
            </FormControl>
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
              loading={loading}
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
