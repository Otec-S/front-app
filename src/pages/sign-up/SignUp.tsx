import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../../shared-theme/AppTheme";
import ColorModeSelect from "../../shared-theme/ColorModeSelect";
import { useState } from "react";
import Logo from "../../assets/TB-Logo-clear.png";

import styles from "./SignUp.module.css";
import {
  Alert,
  AlertTitle,
  IconButton,
  InputAdornment,
  Modal,
  OutlinedInput,
  Tooltip,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { userRegistration } from "../../utils/api/user-registration";

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

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const [open, setOpen] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertStatus, setAlertStatus] = useState<
    "success" | "error" | "warning" | "info"
  >("success");
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const showAlert = (
    status: "success" | "error" | "warning" | "info",
    title: string,
    text: string,
  ) => {
    handleOpen();
    setAlertStatus(status);
    setAlertTitle(title);
    setAlertText(text);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Введите корректный email");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value) {
      setPasswordError(true);
      setPasswordErrorMessage("Введите пароль");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailError || passwordError) {
      return;
    }

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString().trim() ?? "";
    const password = data.get("password")?.toString().trim() ?? "";

    try {
      setLoading(true);
      const res = await userRegistration({ email, password });
      if (res.error === "internal_server_error") {
        showAlert("error", "Что-то пошло не так!", "Ошибка сервера");
      } else if (res.id) {
        console.log("Регистрация прошла успешно");
        showAlert(
          "success",
          "Регистрация прошла успешно!",
          "Для активации аккаунта перейдите по ссылке в письме",
        );
      } else if (res.data.email) {
        console.log("Ошибка в email:", res.data.email.toString());
        showAlert("warning", "Ошибка в email:", res.data.email.toString());
      } else if (res.data.password) {
        console.log("Ошибка в password:", res.data.password.toString());
        showAlert(
          "warning",
          "Ошибка в password:",
          res.data.password.toString(),
        );
      }
    } catch (error) {
      console.error("Ошибка в handleSubmit:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal}>
          <Alert severity={alertStatus} sx={{ borderRadius: "5px" }}>
            <AlertTitle>{alertTitle}</AlertTitle>
            {alertText}
          </Alert>
        </Box>
      </Modal>

      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <ColorModeSelect
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        />
        <SignUpContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            <img
              className={styles.logo}
              src={Logo}
              alt="Логотип Трансфербокс"
            />
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            >
              Регистрация
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  fullWidth
                  autoFocus
                  id="email"
                  name="email"
                  autoComplete="email"
                  variant="outlined"
                  error={emailError}
                />
                <div className={styles.placeForErrMassage}>
                  {emailError ? emailErrorMessage : ""}
                </div>
              </FormControl>

              <FormLabel htmlFor="password" style={{ marginBottom: "-9px" }}>
                Password
              </FormLabel>
              <Tooltip
                placement="top-start"
                arrow
                disableFocusListener
                title="Пожалуйста, придумайте хорошо защищенный пароль"
              >
                <FormControl error={passwordError}>
                  <OutlinedInput
                    fullWidth
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <div className={styles.placeForErrMassage}>
                    {passwordError ? passwordErrorMessage : ""}
                  </div>
                </FormControl>
              </Tooltip>
              <LoadingButton
                type="submit"
                variant="contained"
                fullWidth
                color="secondary"
                onClick={validateInputs}
                loading={loading}
              >
                Зарегистрироваться
              </LoadingButton>
            </Box>
            <Divider>
              <Typography sx={{ color: "text.secondary" }}>или</Typography>
            </Divider>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography sx={{ textAlign: "center" }}>
                Уже зарегистрированы?{" "}
                <Link
                  href="/sign-in/"
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                >
                  Войти
                </Link>
              </Typography>
            </Box>
          </Card>
        </SignUpContainer>
      </AppTheme>
    </>
  );
}
