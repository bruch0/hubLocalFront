import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyles from "../Components/Shared/GlobalStyles";

import PrivateProvider from "@Pages/Private/PrivateProvider";

import LoginPage from "@Pages/Public/Login";
import RegisterPage from "@Pages/Public/Register";
import CompaniesPage from "@Pages/Private/Companies";
import LocalsPage from "@Pages/Private/Locals";

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
      element: (
        <>
          <PrivateProvider />
          <CompaniesPage />
        </>
      ),
    },
    {
      path: "/companies/:companyId",
      element: (
        <>
          <PrivateProvider />
          <LocalsPage />
        </>
      ),
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
