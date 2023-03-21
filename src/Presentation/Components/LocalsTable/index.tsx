import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ReactModal } from "@Frameworks/Modal/react-modal";
import { ReactToastifyUserFeedback } from "@Frameworks/Feedback/react-toastfy";

import FormBuilder from "@Components/FormBuilder";

import { type Local } from "@Interfaces";

import { deleteLocal, updateLocal } from "@Service/api";

import { TableHolder, ActionsHolder } from "./styles";
import { useState } from "react";

interface LocalsTableProps {
  locals: Local[];
  authToken: string;
  refetchData: () => void;
}

const CompaniesTable = ({
  locals,
  authToken,
  refetchData,
}: LocalsTableProps) => {
  const modalManager = new ReactModal();
  const toaster = new ReactToastifyUserFeedback();

  const updateLocalSubmitForm = (data: {
    id: number;
    name: string;
    zipcode: string;
    state: string;
    city: string;
    neighborhood: string;
    streetAddress: string;
    number?: number;
  }) => {
    updateLocal(authToken, { ...data, number: Number(data.number) })
      .then(() => {
        refetchData();
        toaster.success("Local atualizado");
      })
      .catch(({ response }) => toaster.error(response.data.message));
  };

  const deleteLocalSubmitForm = (data: { id: number }) => {
    deleteLocal(authToken, data.id)
      .then(() => {
        refetchData();
        toaster.success("Local excluído");
      })
      .catch(({ response }) => toaster.error(response.data.message));
  };
  const columnHelper = createColumnHelper<Local>();

  const columns = [
    columnHelper.accessor((row) => row, {
      id: "localName",
      cell: (info) => info.row.original.name,
      header: () => <span>Local</span>,
    }),
    columnHelper.accessor((row) => row, {
      id: "actions",
      cell: (info) => {
        const [localModal, setLocalModal] = useState<"update" | "delete" | "">(
          ""
        );

        return (
          <ActionsHolder>
            {modalManager.modal({
              isOpen: localModal === "update",
              setIsOpen: (value: boolean) => {
                setLocalModal(value ? "update" : "");
              },
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
                        name: "zipcode",
                        label: "CEP",
                        pattern: /[0-9]{5}-[0-9]{3}/,
                        errorMessage: "Insira um CEP válido",
                        defaultValue: info.row.original.zipcode,
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
                        defaultValue: info.row.original.streetAddress,
                        required: true,
                        disabled: false,
                        nested: true,
                        type: "text",
                      },
                      {
                        name: "number",
                        label: "Numero",
                        errorMessage: "Insira um número válido",
                        pattern: /^\d*/,
                        defaultValue: `${info.row.original.number ?? ""}`,
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
                        defaultValue: info.row.original.neighborhood,
                        required: true,
                        disabled: false,
                        nested: true,
                        type: "text",
                      },
                      {
                        name: "city",
                        label: "Cidade",
                        errorMessage: "Insira uma cidade",
                        defaultValue: info.row.original.city,
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
                        defaultValue: info.row.original.state,
                        pattern: /[a-zA-Z]+/,
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
                      name: string;
                      zipcode: string;
                      state: string;
                      city: string;
                      neighborhood: string;
                      streetAddress: string;
                      number?: number;
                    }) => {
                      updateLocalSubmitForm({
                        ...data,
                        id: info.row.original.id,
                      });
                    },
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

            {modalManager.modal({
              isOpen: localModal === "delete",
              setIsOpen: (value: boolean) => {
                setLocalModal(value ? "delete" : "");
              },
              modalTitle: "Confirmação de exclusão",
              modalContent: (
                <FormBuilder
                  formData={{
                    inputs: [],
                    message: `O local ${info.row.original.name} será excluído. Tem certeza dessa ação?`,
                    submitButton: {
                      value: "Excluir",
                      height: "50px",
                      width: "100px",
                      fontSize: "100%",
                      red: true,
                    },
                    onSubmit: () => {
                      deleteLocalSubmitForm({ id: info.row.original.id });
                    },
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
    data: locals,
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
