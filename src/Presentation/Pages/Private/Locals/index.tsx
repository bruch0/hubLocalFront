import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { ReactToastifyUserFeedback } from "@Frameworks/Feedback/react-toastfy";
import { ReactModal } from "@Frameworks/Modal/react-modal";

import Navbar from "@Components/Shared/Navbar";
import ActionButton from "@Components/Shared/ActionButton";
import Pagination from "@Components/Shared/Pagination";
import FormBuilder from "@Components/FormBuilder";
import LocalsTable from "@Components/LocalsTable";

import { Local } from "@Interfaces";

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

  const changeItemsPerPage = (items: number) =>
    setLocalData({ ...localData, itemsPerPage: items });

  const changePageNumber = (page: number) =>
    setLocalData({ ...localData, pageNumber: page });

  const [refetchDataSignal, setRefetchDataSignal] = useState<{
    refetchData: {};
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
