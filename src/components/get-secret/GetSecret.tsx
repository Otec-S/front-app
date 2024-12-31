import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button,
  // Alert,
  // AlertTitle,
  IconButton,
  InputAdornment,
  // Modal,
  OutlinedInput,
} from "@mui/material";
import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
// import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { forwardRef, useState } from "react";

import styles from "./GetSecret.module.css";

interface Props {
  secretName: string;
  onCancelGet: () => void;
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

const GetSecretContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  // "&::before": {
  //   content: '""',
  //   display: "block",
  //   position: "absolute",
  //   zIndex: -1,
  //   inset: 0,
  //   backgroundImage:
  //     "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  //   backgroundRepeat: "no-repeat",
  //   ...theme.applyStyles("dark", {
  //     backgroundImage:
  //       "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  //   }),
  // },
}));

// const AddSecret = forwardRef<HTMLDivElement, Props>(({ onCancelAdd }, ref) => {

const GetSecret = forwardRef<HTMLDivElement, Props>(
  ({ onCancelGet, secretName }, ref) => {
    // const [open, setOpen] = useState(false);
    // const [secretNameError, setSecretNameError] = useState(false);
    // const [secretNameErrorMessage, setSecretNameErrorMessage] = useState("");

    // const [emailError, setEmailError] = useState(false);
    // const [emailErrorMessage, setEmailErrorMessage] = useState("");

    const [secretPasswordError, setSecretPasswordError] = useState(false);
    const [secretPasswordErrorMessage, setSecretPasswordErrorMessage] =
      useState("");

    // const [repeatSecretPasswordError, setRepeatSecretPasswordError] =
    //   useState(false);
    // const [
    //   repeatSecretPasswordErrorMessage,
    //   setRepeatSecretPasswordErrorMessage,
    // ] = useState("");

    // const [secretFileError, setSecretFileError] = useState(false);
    // const [secretFileErrorMessage, setSecretFileErrorMessage] = useState("");

    const [showSecretPassword, setShowSecretPassword] = useState(false);
    // const [showRepeatSecretPassword, setShowRepeatSecretPassword] =
    useState(false);

     
    // const [secretFile, setSecretFile] = useState<File | null>(null);
    // const [alertText, setAlertText] = useState("");
    // const [alertTitle, setAlertTitle] = useState("");
    // const [alertStatus, setAlertStatus] = useState<
    //   "success" | "error" | "warning" | "info"
    // >("success");
    // const [loading, setLoading] = useState(false);

    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    // const showAlert = (
    //   status: "success" | "error" | "warning" | "info",
    //   title: string,
    //   text: string,
    // ) => {
    //   handleOpen();
    //   setAlertStatus(status);
    //   setAlertTitle(title);
    //   setAlertText(text);
    // };

    const handleClickShowSecretPassword = () =>
      setShowSecretPassword((show) => !show);
    // const handleClickShowRepeatSecretPassword = () =>
    //   setShowRepeatSecretPassword((show) => !show);

    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   const files = event.target.files;
    //   if (files && files.length > 0) {
    //     setSecretFile(files[0]);
    //   }
    // };

    const validateInputs = () => {
      // const secretName = document.getElementById(
      //   "secretName",
      // ) as HTMLInputElement;
      // const email = document.getElementById("receiverEmail") as HTMLInputElement;
      // const secretFile = document.getElementById(
      //   "secretFile",
      // ) as HTMLInputElement;
      const secretPassword = document.getElementById(
        "secretPassword",
      ) as HTMLInputElement;
      // const repeatSecretPassword = document.getElementById(
      //   "repeatSecretPassword",
      // ) as HTMLInputElement;

      let isValid = true;

      // if (!secretName.value) {
      //   setSecretNameError(true);
      //   setSecretNameErrorMessage("Введите наименование секрета");
      //   isValid = false;
      // } else {
      //   setSecretNameError(false);
      //   setSecretNameErrorMessage("");
      // }
      // if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      //   setEmailError(true);
      //   setEmailErrorMessage("Введите корректный email");
      //   isValid = false;
      // } else {
      //   setEmailError(false);
      //   setEmailErrorMessage("");
      // }

      // if (!secretFile.value) {
      //   setSecretFileError(true);
      //   setSecretFileErrorMessage("Выберите файл с секретом");
      //   isValid = false;
      // } else {
      //   setSecretFileError(false);
      //   setSecretFileErrorMessage("");
      // }

      if (!secretPassword.value) {
        setSecretPasswordError(true);
        setSecretPasswordErrorMessage("Введите пароль для секрета");
        isValid = false;
      } else {
        setSecretPasswordError(false);
        setSecretPasswordErrorMessage("");
      }

      // if (!repeatSecretPassword.value) {
      //   setRepeatSecretPasswordError(true);
      //   setRepeatSecretPasswordErrorMessage("Повторите пароль для секрета");
      //   isValid = false;
      // } else if (secretPassword.value !== repeatSecretPassword.value) {
      //   setRepeatSecretPasswordError(true);
      //   setRepeatSecretPasswordErrorMessage("Пароли не совпадают");
      //   isValid = false;
      // } else {
      //   setRepeatSecretPasswordError(false);
      //   setRepeatSecretPasswordErrorMessage("");
      // }

      return isValid;
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
        {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal}>
          <Alert severity={alertStatus}>
            <AlertTitle>{alertTitle}</AlertTitle>
            {alertText}
          </Alert>
        </Box>
      </Modal> */}

        <GetSecretContainer
          ref={ref}
          direction="column"
          justifyContent="space-between"
        >
          <Card variant="outlined">
            <Typography
              component="h2"
              variant="h4"
              sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            >
              {secretName}
            </Typography>

            <Box
              component="form"
              // onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormLabel
                htmlFor="secretPassword"
                style={{ marginBottom: "-9px" }}
              >
                Пароль для получения секрета
              </FormLabel>
              <FormControl error={secretPasswordError}>
                <OutlinedInput
                  fullWidth
                  autoFocus
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
                        {showSecretPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <div className={styles.placeForErrMassage}>
                  {secretPasswordError ? secretPasswordErrorMessage : ""}
                </div>
              </FormControl>

              <LoadingButton
                // type="submit"
                variant="contained"
                fullWidth
                color="primary"
                onClick={validateInputs}
                // loading={loading}
              >
                Скачать секрет
              </LoadingButton>
              <Button variant="outlined" fullWidth onClick={onCancelGet}>
                Отмена
              </Button>
            </Box>
          </Card>
        </GetSecretContainer>
      </>
    );
  },
);
export default GetSecret;
