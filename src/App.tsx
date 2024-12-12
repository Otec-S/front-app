import SignIn from "./pages/sign-in/SignIn";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./utils/constants";
import SignUp from "./pages/sign-up/SignUp";
import Main from "./pages/main/Main";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Main />,
  },
  {
    path: ROUTES.SIGN_UP,
    element: <SignUp />,
  },
  {
    path: ROUTES.SIGN_IN,
    element: <SignIn />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
