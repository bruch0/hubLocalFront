import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyles from "../Components/Shared/GlobalStyles";

import LoginPage from "@Pages/Login";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
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
