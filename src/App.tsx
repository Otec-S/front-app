import SignIn from "./pages/sign-in/SignIn";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./utils/constants";
import SignUp from "./pages/sign-up/SignUp";
import Main from "./pages/main/Main";
import ProtectedRoute from "./components/protected-rout/ProtectedRoute";
import { CssBaseline } from "@mui/material";
import "./utils/fonts";
import "./App.module.css";
import TestCryptoPage from "./pages/test-crypto-page/testCryptoPage";

const router = createBrowserRouter([
  {
    path: ROUTES.SIGN_IN,
    element: <SignIn />,
  },
  {
    path: ROUTES.SIGN_UP,
    element: <SignUp />,
  },
  {
    path: ROUTES.HOME,
    element: (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.TEST,
    element: (
      <ProtectedRoute>
        <TestCryptoPage />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
