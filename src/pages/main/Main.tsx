import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC } from "react";

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
          <h1>УПРАВЛЕНИЕ СЕКРЕТАМИ</h1>
        </Box>
        <Button variant="contained" sx={{ alignSelf: "flex-start" }}>
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
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.receiver}</TableCell>
                  <TableCell>
                    <Button variant="outlined">Удалить</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Main;
