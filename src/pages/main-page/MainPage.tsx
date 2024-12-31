import { FC, useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Alert, AlertTitle } from "@mui/material";

import AddSecret from "../../components/add-secret/AddSecret";
// import GetSecret from "../../components/get-secret/GetSecret";
import ShowSecret from "../../components/show-secret/ShowSecret";
import { secretDelete } from "../../utils/api/secret-delete";
import { SecretsGetFromBackend } from "../../utils/api/secrets-get-from-backend";
import { AllSecretsFromBackend } from "../../utils/types-from-backend";
import styles from "./MainPage.module.css";


const MainPage: FC = () => {
  const [alertText, setAlertText] = useState<string | JSX.Element>("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertStatus, setAlertStatus] = useState<
    "success" | "error" | "warning" | "info"
  >("success");

  const showAlert = (
    status: "success" | "error" | "warning" | "info",
    title: string,
    text: string | JSX.Element,
  ) => {
    handleOpen();
    setAlertStatus(status);
    setAlertTitle(title);
    setAlertText(text);
  };

  const [allSecretsFromBackend, setAllSecretsFromBackend] = useState<
    AllSecretsFromBackend[] | null
  >(null);

  console.info("Cекреты с сервера:", allSecretsFromBackend);

  const [openAlertModal, setOpenAlertModal] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [openRemoveConfirm, setOpenRemoveConfirm] = useState(false);
  const [externalIdForDeletion, setExternalIdForDeletion] = useState<
    string | null
  >(null);
  const [externalIdForShowing, setExternalIdForShowing] = useState<
    string | null
  >(null);

  const [openAddSecretModal, setOpenAddSecretModal] = useState(false);
  // const [openGetSecretModal, setOpenGetSecretModal] = useState(false);
  const [openShowSecretModal, setOpenShowSecretModal] = useState(false);

  const [secretTitle, setSecretTitle] = useState("");

  const handleOpen = () => {
    setOpenAlertModal(true);
  };

  const fetchDataFromBackend = async () => {
    setLoading(true);
    try {
      const result = await SecretsGetFromBackend();
      setAllSecretsFromBackend(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("Unknown error"));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSecret = async () => {
    if (!externalIdForDeletion) return;

    try {
      setLoading(true);
      const result = (await secretDelete(externalIdForDeletion)) as Response;
      if (result.status === 204) {
        setAllSecretsFromBackend((prev) =>
          prev
            ? prev.filter(
                (secret) => secret.external_id !== externalIdForDeletion,
              )
            : null,
        );
      } else {
        showAlert("error", "Что-то пошло не так!", "Ошибка удаления секрета.");
        return;
      }
    } catch (err) {
      showAlert("error", "Что-то пошло не так!", "Ошибка удаления секрета.");
      setError(
        err instanceof Error ? err : new Error("Failed to delete secret."),
      );
    } finally {
      setLoading(false);
      setOpenRemoveConfirm(false);
    }
  };

  const handleClickOpenRemoveConfirm = (external_id: string) => {
    setExternalIdForDeletion(external_id);
    setOpenRemoveConfirm(true);
  };

  const handleCloseRemoveConfirm = () => {
    setOpenRemoveConfirm(false);
    setExternalIdForDeletion(null);
  };

  const handleClickAddSecretModal = () => setOpenAddSecretModal(true);
  const handleCloseAddSecretModal = () => {
    fetchDataFromBackend();
    setOpenAddSecretModal(false);
  };

  // const handleClickGetSecretModal = (title: string) => {
  //   setSecretTitle(title);
  //   setOpenGetSecretModal(true);
  // };

  const handleClickShowSecretModal = (title: string) => {
    setSecretTitle(title);
    setOpenShowSecretModal(true);
  };

  // const handleCloseGetSecretModal = () => setOpenGetSecretModal(false);
  const handleCloseShowSecretModal = () => setOpenShowSecretModal(false);

  useEffect(() => {
    fetchDataFromBackend();
  }, []);

  if (loading) {
    return (
      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (error) {
    showAlert("error", "Что-то пошло не так!", `${error?.message}`);
    return;
  }

  return (
    <>
      <Modal
        open={openAlertModal}
        onClose={() => setOpenAlertModal(false)}
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "#cfe8fc",
          minHeight: "100vh",
          padding: "5rem",
        }}
      >
        <Box sx={{ alignSelf: "center" }}>
          <h1 style={{ letterSpacing: "5px" }}>УПРАВЛЕНИЕ СЕКРЕТАМИ</h1>
        </Box>
        <Button
          variant="contained"
          sx={{ alignSelf: "flex-start" }}
          onClick={handleClickAddSecretModal}
        >
          Добавить секрет
        </Button>
        <TableContainer
          component={Paper}
          sx={{ width: "100%", marginTop: "2rem" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Дата</TableCell>
                <TableCell>Секрет</TableCell>
                <TableCell>Получатель</TableCell>
                <TableCell>Email получателя</TableCell>
                <TableCell>Удаление</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allSecretsFromBackend?.map((secret) => (
                <TableRow
                  key={secret.external_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {new Date(secret.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        handleClickShowSecretModal(secret.filename);
                        setExternalIdForShowing(secret.external_id);
                      }}
                    >
                      {secret.filename}
                    </Button>
                  </TableCell>
                  <TableCell>{secret.recipient.name}</TableCell>
                  <TableCell>{secret.recipient.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      onClick={() =>
                        handleClickOpenRemoveConfirm(secret.external_id)
                      }
                    >
                      <DeleteForeverIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Dialog
        open={openRemoveConfirm}
        onClose={handleCloseRemoveConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: "red" }}>
          {"Безвозвратно удалить секрет?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Удаление секрета приведет к полной потере его данных.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRemoveConfirm} autoFocus>
            Отменить
          </Button>
          <Button onClick={handleDeleteSecret}>Удалить</Button>
        </DialogActions>
      </Dialog>
      <Modal
        open={openAddSecretModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ bordeRadius: "5px" }}
      >
        <AddSecret onCancelAdd={handleCloseAddSecretModal} />
      </Modal>
      <Modal
        open={openShowSecretModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ bordeRadius: "5px" }}
      >
        {/* <GetSecret
          onCancelGet={handleCloseGetSecretModal}
          secretName={secretTitle}
        /> */}
        <ShowSecret
          onCancelShow={handleCloseShowSecretModal}
          secretName={secretTitle}
          external_id={externalIdForShowing}
        />
      </Modal>
    </>
  );
};

export default MainPage;
