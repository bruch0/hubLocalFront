import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ReactModal } from "@Frameworks/Modal/react-modal";
import { ReactToastifyUserFeedback } from "@Frameworks/Feedback/react-toastfy";

import FormBuilder from "@Components/FormBuilder";

import { Company } from "@Interfaces";

import { TableHolder, ActionsHolder } from "./styles";
import { deleteCompany, updateCompany } from "@Service/api";
import { Link } from "react-router-dom";
import { useState } from "react";

interface CompaniesTableProps {
  companies: Company[];
  authToken: string;
  refetchData: () => void;
}

const CompaniesTable = ({
  companies,
  authToken,
  refetchData,
}: CompaniesTableProps) => {
  const modalManager = new ReactModal();
  const toaster = new ReactToastifyUserFeedback();

  const updateCompanySubmitForm = (data: {
    id: number;
    name: string;
    siteUrl: string;
    taxId: string;
  }) => {
    updateCompany(authToken, data)
      .then(() => {
        refetchData();
        toaster.success("Empresa atualizada");
      })
      .catch(({ response }) => toaster.error(response.data.message));
  };

  const deleteCompanySubmitForm = (data: { id: number }) => {
    deleteCompany(authToken, data.id)
      .then(() => {
        refetchData();
        toaster.success("Empresa excluída");
      })
      .catch(({ response }) => toaster.error(response.data.message));
  };
  const columnHelper = createColumnHelper<Company>();

  const columns = [
    columnHelper.accessor((row) => row, {
      id: "companyName",
      cell: (info) => info.row.original.name,
      header: () => <span>Empresa</span>,
    }),
    columnHelper.accessor((row) => row, {
      id: "localQuantity",
      cell: (info) => info.row.original.locals.length,
      header: () => <span>Qt de Locais</span>,
    }),
    columnHelper.accessor((row) => row, {
      id: "actions",
      cell: (info) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [companyModal, setCompanyModal] = useState<
          "update" | "delete" | ""
        >("");

        return (
          <ActionsHolder>
            {modalManager.modal({
              isOpen: companyModal === "update",
              setIsOpen: (value: boolean) =>
                setCompanyModal(value ? "update" : ""),
              modalTitle: `Editar: ${info.row.original.name}`,
              modalContent: (
                <FormBuilder
                  formData={{
                    inputs: [
                      {
                        name: "name",
                        label: "Nome",
                        errorMessage: "Insira um nome",
                        pattern: /[a-zA-Z]+/,
                        defaultValue: info.row.original.name,
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
                        defaultValue: info.row.original.siteUrl,
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
                        defaultValue: info.row.original.taxId,
                        mask: "99.999.999/9999-99",
                        required: true,
                        disabled: false,
                        nested: true,
                        type: "text",
                      },
                    ],
                    submitButton: {
                      value: "Salvar",
                      height: "50px",
                      width: "100px",
                      fontSize: "100%",
                    },
                    onSubmit: (data: {
                      id: number;
                      name: string;
                      siteUrl: string;
                      taxId: string;
                    }) =>
                      updateCompanySubmitForm({
                        ...data,
                        id: info.row.original.id,
                      }),
                    modalBottom: true,
                  }}
                />
              ),
              backgroundColor: "#0385FD",
              openButton: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ marginRight: "20px" }}
                  cursor="pointer"
                >
                  <path
                    d="M21.125 8.15625L15.8125 2.90625L17.5625 1.15625C18.0417 0.677083 18.6304 0.4375 19.3288 0.4375C20.0263 0.4375 20.6146 0.677083 21.0938 1.15625L22.8438 2.90625C23.3229 3.38542 23.5729 3.96375 23.5938 4.64125C23.6146 5.31792 23.3854 5.89583 22.9062 6.375L21.125 8.15625ZM19.3125 10L6.0625 23.25H0.75V17.9375L14 4.6875L19.3125 10Z"
                    fill="black"
                  />
                </svg>
              ),
            })}
            <Link to={`${info.row.original.id}`} style={{ margin: "0px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="25"
                viewBox="0 0 22 25"
                fill="none"
                style={{ marginRight: "20px" }}
                cursor="pointer"
              >
                <path
                  d="M12.9875 23.25C11.65 21.2875 10.25 18.7 10.25 16.375C10.25 14.0875 11.45 12 13.25 10.75H12.75V8.25H15.25V9.7875C15.875 9.6125 16.5 9.5 17.125 9.5C17.3375 9.5 17.55 9.5 17.75 9.5375V0.75H0.25V23.25H7.75V18.875H10.25V23.25H12.9875ZM12.75 3.25H15.25V5.75H12.75V3.25ZM5.25 20.75H2.75V18.25H5.25V20.75ZM5.25 15.75H2.75V13.25H5.25V15.75ZM5.25 10.75H2.75V8.25H5.25V10.75ZM5.25 5.75H2.75V3.25H5.25V5.75ZM7.75 3.25H10.25V5.75H7.75V3.25ZM7.75 8.25H10.25V10.75H7.75V8.25ZM7.75 15.75V13.25H10.25V15.75H7.75ZM17.125 12C14.75 12 12.75 14.0125 12.75 16.375C12.75 19.6375 17.125 24.5 17.125 24.5C17.125 24.5 21.5 19.6375 21.5 16.375C21.5 14.0125 19.5 12 17.125 12ZM17.125 18.0125C16.25 18.0125 15.625 17.2625 15.625 16.5125C15.625 15.6375 16.375 15.0125 17.125 15.0125C17.875 15.0125 18.625 15.75 18.625 16.5125C18.75 17.2625 18 18.0125 17.125 18.0125Z"
                  fill="black"
                />
              </svg>
            </Link>
            {modalManager.modal({
              isOpen: companyModal === "delete",
              setIsOpen: (value: boolean) =>
                setCompanyModal(value ? "delete" : ""),
              modalTitle: "Confirmação de exclusão",
              modalContent: (
                <FormBuilder
                  formData={{
                    inputs: [],
                    message: `A empresa ${info.row.original.name} será excluída. Tem certeza dessa ação?`,
                    submitButton: {
                      value: "Excluir",
                      height: "50px",
                      width: "100px",
                      fontSize: "100%",
                      red: true,
                    },
                    onSubmit: () =>
                      deleteCompanySubmitForm({ id: info.row.original.id }),
                    modalBottom: true,
                  }}
                />
              ),
              backgroundColor: "#C90808",
              openButton: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="24"
                  viewBox="0 0 20 24"
                  fill="none"
                  style={{ marginRight: "20px" }}
                  cursor="pointer"
                >
                  <path
                    d="M3.75 23.25C3.0625 23.25 2.47417 23.0054 1.985 22.5163C1.495 22.0263 1.25 21.4375 1.25 20.75V4.5H0V2H6.25V0.75H13.75V2H20V4.5H18.75V20.75C18.75 21.4375 18.5054 22.0263 18.0163 22.5163C17.5263 23.0054 16.9375 23.25 16.25 23.25H3.75ZM6.25 18.25H8.75V7H6.25V18.25ZM11.25 18.25H13.75V7H11.25V18.25Z"
                    fill="#C90808"
                  />
                </svg>
              ),
            })}
          </ActionsHolder>
        );
      },
      header: () => <span>Ações</span>,
    }),
  ];

  const table = useReactTable({
    data: companies,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableHolder>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <>
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </TableHolder>
  );
};

export default CompaniesTable;
