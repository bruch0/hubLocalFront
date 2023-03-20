import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { ReactToastifyUserFeedback } from "@Frameworks/Feedback/react-toastfy";
import { ReactModal } from "@Frameworks/Modal/react-modal";

import Navbar from "@Components/Shared/Navbar";
import ActionButton from "@Components/Shared/ActionButton";
import FormBuilder from "@Components/FormBuilder";

import { Company } from "@Interfaces";

import UserContext from "@Contexts/User";

import { getUserCompanies } from "@Service/api";

import { NoCompanies, PageHolder } from "./styles";

const CompaniesPage = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const modalManager = new ReactModal();

  const [companyData, setCompanyData] = useState<{
    companies: Company[];
    itemsPerPage: number;
    pageNumber: number;
  }>({ companies: [], itemsPerPage: 10, pageNumber: 1 });

  useEffect(() => {
    getUserCompanies(
      userContext.token,
      companyData.itemsPerPage,
      companyData.pageNumber
    )
      .then(({ data }) =>
        setCompanyData({
          itemsPerPage: companyData.itemsPerPage,
          pageNumber: companyData.pageNumber,
          companies: data.content,
        })
      )
      .catch(() => {
        userContext.token = "";
      });
  }, [navigate, userContext, companyData.itemsPerPage, companyData.pageNumber]);

  const formInputs = [
    {
      name: "name",
      label: "Nome",
      errorMessage: "Insira um nome",
      pattern: /[a-zA-Z]+/,
      required: true,
      disabled: false,
      nested: false,
      type: "text",
    },
    {
      name: "siteUrl",
      label: "Website",
      pattern:
        /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#-]+\/?)*$/,
      errorMessage: "Insira um site válido",
      required: true,
      disabled: false,
      nested: true,
      type: "text",
    },
    {
      name: "taxId",
      label: "CNPJ",
      pattern: /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
      errorMessage: "Insira um CNPJ válido",
      mask: "11",
      required: true,
      disabled: false,
      nested: true,
      type: "text",
    },
  ];

  return (
    <>
      <Navbar />
      <PageHolder>
        {companyData.companies.length === 0 && (
          <>
            <NoCompanies>Nenhuma empresa cadastrada!</NoCompanies>
            {modalManager.modal({
              modalTitle: "Adicionar Empresa",
              modalContent: (
                <FormBuilder
                  formData={{
                    inputs: formInputs,
                    submitButton: {
                      value: "Adicionar",
                      height: "50px",
                      width: "100px",
                      fontSize: "100%",
                    },
                    onSubmit: (e: any) => console.log(e),
                    modalBottom: true,
                  }}
                />
              ),
              backgroundColor: "#0385FD",
              openButton: (
                <ActionButton
                  value="Adicionar Empresa"
                  width="400px"
                  height="70px"
                  disabled={false}
                  onClick={() => null}
                />
              ),
            })}
          </>
        )}
      </PageHolder>
    </>
  );
};

export default CompaniesPage;
