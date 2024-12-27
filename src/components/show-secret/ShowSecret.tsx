import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { forwardRef, useEffect, useState } from "react";

import { OutlinedInput } from "@mui/material";
import { secretShow } from "../../utils/api/secret-show";
import { LoadingButton } from "@mui/lab";

interface Props {
  secretName: string;
  external_id: string | null;
  onCancelShow: () => void;
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
    overflowY: "auto",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const ShowSecretContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

const ShowSecret = forwardRef<HTMLDivElement, Props>(
  ({ secretName, external_id, onCancelShow }, ref) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      const fetchSecret = async () => {
        setLoading(true);
        try {
          if (!external_id) {
            throw new Error("Ошибка: не задан external_id");
          }
          const response = (await secretShow(external_id)) as Response;
          if (!response.ok) {
            throw new Error("Ошибка получения данных");
          }

          const data: string = await response.text();
          const input = document.getElementById(
            "showSecret",
          ) as HTMLInputElement | null;

          if (input) {
            input.value = data
              ? data.substring(0, 300) + "..."
              : "Ошибка: секрет не найден";
          }
        } catch (error) {
          console.error("Ошибка:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchSecret();
    }, []);

    return (
      <>
        <ShowSecretContainer
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
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormLabel htmlFor="showSecret" style={{ marginBottom: "-9px" }}>
                В таком виде хранится ваш секрет на сервере
              </FormLabel>
              <FormControl>
                <OutlinedInput
                  fullWidth
                  autoFocus
                  name="showSecret"
                  id="showSecret"
                  type="text"
                  multiline
                  readOnly
                />
              </FormControl>

              <LoadingButton
                variant="contained"
                fullWidth
                color="primary"
                loading={loading}
                onClick={onCancelShow}
              >
                Закрыть
              </LoadingButton>
            </Box>
          </Card>
        </ShowSecretContainer>
      </>
    );
  },
);
export default ShowSecret;
