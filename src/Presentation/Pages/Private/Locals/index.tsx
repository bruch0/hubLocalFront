import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { ReactToastifyUserFeedback } from "@Frameworks/Feedback/react-toastfy";
import { ReactModal } from "@Frameworks/Modal/react-modal";

import Navbar from "@Components/Shared/Navbar";
import ActionButton from "@Components/Shared/ActionButton";
import Pagination from "@Components/Shared/Pagination";
import FormBuilder from "@Components/FormBuilder";
import LocalsTable from "@Components/LocalsTable";

import { type Local } from "@Interfaces";

import UserContext from "@Contexts/User";

import { createLocal, getCompanyLocals } from "@Service/api";

import {
  NoCompanies,
  PageHolder,
  AddCompanyButtonHolder,
  TableAndPaginationHolder,
} from "./styles";

const LocalsPage = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const { companyId } = useParams();
  const toaster = new ReactToastifyUserFeedback();
  const modalManager = new ReactModal();

  const [localData, setLocalData] = useState<{
    locals: Local[];
    itemsPerPage: number;
    pageNumber: number;
    totalPages: number;
  }>({ locals: [], itemsPerPage: 10, pageNumber: 1, totalPages: 1 });
  const [createLocalModal, setCreateLocalModal] = useState<boolean>(false);

  const changeItemsPerPage = (items: number) => {
    setLocalData({ ...localData, itemsPerPage: items });
  };

  const changePageNumber = (page: number) => {
    setLocalData({ ...localData, pageNumber: page });
  };

  const [refetchDataSignal, setRefetchDataSignal] = useState<{
    refetchData: unknown;
  }>({ refetchData: {} });

  useEffect(() => {
    getCompanyLocals(
      Number(companyId),
      userContext.token,
      localData.itemsPerPage,
      localData.pageNumber
    )
      .then(({ data }) => {
        setCreateLocalModal(false);

        setLocalData({
          itemsPerPage: localData.itemsPerPage,
          pageNumber: localData.pageNumber,
          locals: data.content.locals,
          totalPages: data.content.pages,
        });
      })
      .catch(() => {
        userContext.token = "";
      });
  }, [
    navigate,
    userContext,
    localData.itemsPerPage,
    localData.pageNumber,
    refetchDataSignal,
    companyId,
  ]);

  const refetchData = () => {
    setRefetchDataSignal({ refetchData: { ...{} } });
  };

  const createLocalFormInputs = [
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
      name: "zipcode",
      label: "CEP",
      pattern: /[0-9]{5}-[0-9]{3}/,
      errorMessage: "Insira um CEP válido",
      required: true,
      disabled: false,
      nested: true,
      type: "number",
      mask: "99999-999",
    },
    {
      name: "streetAddress",
      label: "Rua",
      errorMessage: "Insira uma rua",
      pattern: /[a-zA-Z]+/,
      required: true,
      disabled: false,
      nested: true,
      type: "text",
    },
    {
      name: "number",
      label: "Numero",
      errorMessage: "Insira um número válido",
      pattern: /^(0|[1-9]\d*)(\.\d+)?$/,
      required: false,
      disabled: false,
      nested: true,
      type: "text",
    },
    {
      name: "neighborhood",
      label: "Bairro",
      errorMessage: "Insira um bairro",
      pattern: /[a-zA-Z]+/,
      required: true,
      disabled: false,
      nested: true,
      type: "text",
    },
    {
      name: "city",
      label: "Cidade",
      errorMessage: "Insira uma cidade",
      pattern: /[a-zA-Z]+/,
      required: true,
      disabled: false,
      nested: true,
      type: "text",
    },
    {
      name: "state",
      label: "Estado",
      errorMessage: "Insira um estado",
      pattern: /[a-zA-Z]+/,
      required: true,
      disabled: false,
      nested: true,
      type: "text",
    },
  ];

  const createLocalSubmitForm = (data: {
    name: string;
    zipcode: string;
    state: string;
    city: string;
    neighborhood: string;
    streetAddress: string;
    number?: number;
  }) =>
    createLocal(userContext.token, {
      ...data,
      number: Number(data.number),
      companyId: Number(companyId),
    })
      .then(() => {
        refetchData();
        toaster.success("Local cadastrado");
      })
      .catch(({ response }) => toaster.error(response.data.message));

  return (
    <>
      <Navbar />
      <Link
        to="/companies"
        style={{
          textAlign: "start",
          width: "90%",
          display: "flex",
          marginTop: "30px",
        }}
      >
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ marginRight: "10px" }}
          >
            <path
              d="M6.875 15.3L0.275 8.69996C0.175 8.59996 0.104 8.49163 0.0619998 8.37496C0.0206665 8.25829 0 8.13329 0 7.99996C0 7.86663 0.0206665 7.74163 0.0619998 7.62496C0.104 7.50829 0.175 7.39996 0.275 7.29996L6.875 0.69996C7.05833 0.516627 7.28733 0.420627 7.562 0.411961C7.83733 0.403961 8.075 0.49996 8.275 0.69996C8.475 0.883294 8.57933 1.11229 8.588 1.38696C8.596 1.66229 8.5 1.89996 8.3 2.09996L3.4 6.99996H14.575C14.8583 6.99996 15.096 7.09563 15.288 7.28696C15.4793 7.47896 15.575 7.71663 15.575 7.99996C15.575 8.28329 15.4793 8.52063 15.288 8.71196C15.096 8.90396 14.8583 8.99996 14.575 8.99996H3.4L8.3 13.9C8.48333 14.0833 8.57933 14.3166 8.588 14.6C8.596 14.8833 8.5 15.1166 8.3 15.3C8.11667 15.5 7.88333 15.6 7.6 15.6C7.31667 15.6 7.075 15.5 6.875 15.3Z"
              fill="#4D4D4D"
            />
          </svg>
          Minhas Empresas
        </>
      </Link>
      <PageHolder empty={localData.locals.length === 0}>
        {localData.locals.length === 0 && (
          <>
            <NoCompanies>Nenhum local cadastrado!</NoCompanies>
            {modalManager.modal({
              isOpen: createLocalModal,
              setIsOpen: setCreateLocalModal,
              modalTitle: "Adicionar Local",
              modalContent: (
                <FormBuilder
                  formData={{
                    inputs: createLocalFormInputs,
                    submitButton: {
                      value: "Adicionar",
                      height: "50px",
                      width: "100px",
                      fontSize: "100%",
                    },
                    onSubmit: createLocalSubmitForm,
                    modalBottom: true,
                  }}
                />
              ),
              backgroundColor: "#0385FD",
              openButton: (
                <ActionButton
                  value="Adicionar Local"
                  width="400px"
                  height="70px"
                  disabled={false}
                  onClick={() => null}
                />
              ),
            })}
          </>
        )}

        {localData.locals.length > 0 && (
          <>
            <AddCompanyButtonHolder>
              {modalManager.modal({
                isOpen: createLocalModal,
                setIsOpen: setCreateLocalModal,
                modalTitle: "Adicionar local",
                modalContent: (
                  <FormBuilder
                    formData={{
                      inputs: createLocalFormInputs,
                      submitButton: {
                        value: "Adicionar",
                        height: "50px",
                        width: "100px",
                        fontSize: "100%",
                      },
                      onSubmit: createLocalSubmitForm,
                      modalBottom: true,
                    }}
                  />
                ),
                backgroundColor: "#0385FD",
                openButton: (
                  <ActionButton
                    value="Adicionar Local"
                    width="300px"
                    height="50px"
                    disabled={false}
                    onClick={() => null}
                  />
                ),
              })}
            </AddCompanyButtonHolder>
            <TableAndPaginationHolder>
              <LocalsTable
                locals={localData.locals}
                authToken={userContext.token}
                refetchData={refetchData}
              />
              <Pagination
                changeItemsPerPage={changeItemsPerPage}
                itemsPerPage={localData.itemsPerPage}
                page={localData.pageNumber}
                maxPageNumber={localData.totalPages}
                changePageNumber={changePageNumber}
              />
            </TableAndPaginationHolder>
          </>
        )}
      </PageHolder>
    </>
  );
};

export default LocalsPage;
