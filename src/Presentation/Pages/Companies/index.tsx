import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { JsCookieManager } from "@Frameworks/Cookie/js-cookie";
import { ReactToastifyUserFeedback } from "@Frameworks/Feedback/react-toastfy";

import Navbar from "@Components/Shared/Navbar";
import ActionButton from "@Components/Shared/ActionButton";

import { Company } from "@Interfaces";

import UserContext from "@Contexts/User";

import { getUserCompanies } from "@Service/api";

import { NoCompanies, PageHolder } from "./styles";

const CompaniesPage = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const cookieManager = new JsCookieManager();
    const toaster = new ReactToastifyUserFeedback();

    const forceLogout = () => {
      userContext.email = "";
      userContext.name = "";
      userContext.token = "";

      cookieManager.deleteCookie("token");
      cookieManager.deleteCookie("name");

      toaster.error("Faça login novamente");

      navigate("/");
    };

    if (userContext.token) {
      getUserCompanies(userContext.token)
        .then(({ data }) => setCompanies(data.content))
        .then(() => forceLogout());
    } else {
      forceLogout();
    }
  }, [navigate, userContext]);

  return (
    <>
      <Navbar />
      <PageHolder>
        {companies.length === 0 && (
          <>
            <NoCompanies>Nenhuma empresa cadastrada!</NoCompanies>
            <ActionButton
              value="Adicionar Empresa"
              width="400px"
              height="70px"
              disabled={false}
              onClick={() => console.log("oi")}
            />
          </>
        )}
      </PageHolder>
    </>
  );
};

export default CompaniesPage;
