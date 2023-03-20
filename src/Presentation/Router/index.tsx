import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyles from "../Components/Shared/GlobalStyles";

import LoginPage from "@Pages/Login";
import RegisterPage from "@Pages/Register";
import CompaniesPage from "@Pages/Companies";

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
    {
      path: "/companies",
      element: <CompaniesPage />,
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
