import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyles from "../Components/Shared/GlobalStyles";

import LoginPage from "@Pages/Login";
import RegisterPage from "@Pages/Register";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);

  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
