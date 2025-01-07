import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./utils/fonts";
import { CssBaseline } from "@mui/material";

import ProtectedRoute from "./components/protected-rout/ProtectedRoute";
import MainPage from "./pages/main-page/MainPage";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import { ROUTES } from "./utils/constants";

import "./App.module.css";
// import TestCryptoPage from "./pages/test-crypto-page/testCryptoPage";

function App() {
  return (
    <>
      <CssBaseline />
      <Router basename="/front-app/">
        <Routes>
          <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route
            path={ROUTES.HOME}
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path={ROUTES.TEST}
            element={
              <ProtectedRoute>
                <TestCryptoPage />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
