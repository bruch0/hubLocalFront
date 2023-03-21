import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { ReactToastifyUserFeedback } from "@Frameworks/Feedback/react-toastfy";
import { ReactModal } from "@Frameworks/Modal/react-modal";

import Navbar from "@Components/Shared/Navbar";
import ActionButton from "@Components/Shared/ActionButton";
import Pagination from "@Components/Shared/Pagination";
import FormBuilder from "@Components/FormBuilder";
import CompaniesTable from "@Components/CompaniesTable";

import { Company } from "@Interfaces";

import UserContext from "@Contexts/User";

import { createCompany, getUserCompanies } from "@Service/api";

import {
  NoCompanies,
  PageHolder,
  AddCompanyButtonHolder,
  TableAndPaginationHolder,
} from "./styles";

const CompaniesPage = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const toaster = new ReactToastifyUserFeedback();
  const modalManager = new ReactModal();

  const [companyData, setCompanyData] = useState<{
    companies: Company[];
    itemsPerPage: number;
    pageNumber: number;
    totalPages: number;
  }>({ companies: [], itemsPerPage: 10, pageNumber: 1, totalPages: 1 });

  const changeItemsPerPage = (items: number) =>
    setCompanyData({ ...companyData, itemsPerPage: items });

  const [refetchDataSignal, setRefetchDataSignal] = useState<{
    refetchData: {};
  }>({ refetchData: {} });

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
          companies: data.content.companies,
          totalPages: data.content.pages,
        })
      )
      .catch(() => {
        userContext.token = "";
      });
  }, [
    navigate,
    userContext,
    companyData.itemsPerPage,
    companyData.pageNumber,
    refetchDataSignal,
  ]);

  const refetchData = () => {
    setRefetchDataSignal({ refetchData: { ...{} } });
  };

  const createCompanyFormInputs = [
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
      pattern: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
      errorMessage: "Insira um CNPJ válido",
      mask: "11",
      required: true,
      disabled: false,
      nested: true,
      type: "text",
    },
  ];

  const createCompanySubmitForm = (data: {
    name: string;
    siteUrl: string;
    taxId: string;
  }) =>
    createCompany(userContext.token, data)
      .then(() => {
        refetchData();
        toaster.success("Empresa cadastrada");
      })
      .catch(({ response }) => toaster.error(response.data.message));

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
                    inputs: createCompanyFormInputs,
                    submitButton: {
                      value: "Adicionar",
                      height: "50px",
                      width: "100px",
                      fontSize: "100%",
                    },
                    onSubmit: createCompanySubmitForm,
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
        {companyData.companies.length > 0 && (
          <>
            <AddCompanyButtonHolder>
              {modalManager.modal({
                modalTitle: "Adicionar Empresa",
                modalContent: (
                  <FormBuilder
                    formData={{
                      inputs: createCompanyFormInputs,
                      submitButton: {
                        value: "Adicionar",
                        height: "50px",
                        width: "100px",
                        fontSize: "100%",
                      },
                      onSubmit: createCompanySubmitForm,
                      modalBottom: true,
                    }}
                  />
                ),
                backgroundColor: "#0385FD",
                openButton: (
                  <ActionButton
                    value="Adicionar Empresa"
                    width="300px"
                    height="50px"
                    disabled={false}
                    onClick={() => null}
                  />
                ),
              })}
            </AddCompanyButtonHolder>
            <TableAndPaginationHolder>
              <CompaniesTable
                companies={companyData.companies}
                authToken={userContext.token}
                refetchData={refetchData}
              />
              <Pagination
                changeItemsPerPage={changeItemsPerPage}
                itemsPerPage={companyData.itemsPerPage}
              />
            </TableAndPaginationHolder>
          </>
        )}
      </PageHolder>
    </>
  );
};

export default CompaniesPage;
