import {
  Box,
  Button,
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
import { FC, useState } from "react";
import AddSecret from "../../components/add-secret/AddSecret";
import GetSecret from "../../components/get-secret/GetSecret";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function createData(date: string, name: string, receiver: string) {
  return { date, name, receiver };
}

const rows = [
  createData("12.12.2024", "Фотоархив", "sergey.adviser@gmail.com"),
  createData("11.12.2024", "Документы", "test@test.test"),
  createData("10.12.2024", "Контракты", "example@example.com"),
  createData("09.12.2024", "Записи", "info@domain.com"),
  createData("08.12.2024", "Отчеты", "user@provider.net"),
  createData("07.12.2024", "Презентации", "contact@service.org"),
  createData("06.12.2024", "Бюллетени", "admin@website.co"),
];

const Main: FC = () => {
  const [openRemoveConfirm, setOpenRemoveConfirm] = useState(false);
  const [openAddSecretModal, setOpenAddSecretModal] = useState(false);
  const [openGetSecretModal, setOpenGetSecretModal] = useState(false);

  const [secretTitle, setSecretTitle] = useState("");

  const handleClickOpenRemoveConfirm = () => {
    setOpenRemoveConfirm(true);
  };

  const handleCloseRemoveConfirm = () => {
    setOpenRemoveConfirm(false);
  };

  const handleClickAddSecretModal = () => setOpenAddSecretModal(true);
  const handleCloseAddSecretModal = () => setOpenAddSecretModal(false);

  const handleClickGetSecretModal = (title: string) => {
    setSecretTitle(title);
    setOpenGetSecretModal(true);
  };

  const handleCloseGetSecretModal = () => setOpenGetSecretModal(false);

  return (
    <>
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
                <TableCell>Удаление</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleClickGetSecretModal(row.name)}>
                      {row.name}
                    </Button>
                  </TableCell>
                  <TableCell>{row.receiver}</TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      onClick={handleClickOpenRemoveConfirm}
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
          <Button onClick={handleCloseRemoveConfirm}>Удалить</Button>
        </DialogActions>
      </Dialog>
      <Modal
        open={openAddSecretModal}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
        sx={{ bordeRadius: "5px" }}
      >
        <AddSecret onCancelAdd={handleCloseAddSecretModal} />
      </Modal>
      <Modal
        open={openGetSecretModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ bordeRadius: "5px" }}
      >
        <GetSecret
          onCancelGet={handleCloseGetSecretModal}
          secretName={secretTitle}
        />
      </Modal>
    </>
  );
};

export default Main;
