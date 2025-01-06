import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./utils/fonts";
import { CssBaseline } from "@mui/material";

import ProtectedRoute from "./components/protected-rout/ProtectedRoute";
import MainPage from "./pages/main-page/MainPage";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import { ROUTES } from "./utils/constants";

import "./App.module.css";
// import TestCryptoPage from "./pages/test-crypto-page/testCryptoPage";

// const a: string = 5;

const router = createBrowserRouter(
  [
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
          <MainPage />
        </ProtectedRoute>
      ),
    },
    // {
    //   path: ROUTES.TEST,
    //   element: (
    //     <ProtectedRoute>
    //       <TestCryptoPage />
    //     </ProtectedRoute>
    //   ),
    // },
  ],
  { basename: "/front-app" },
);

function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
