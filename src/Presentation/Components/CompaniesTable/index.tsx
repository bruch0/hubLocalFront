import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { TableHolder } from "./styles";
import { Company } from "@Interfaces";

interface CompaniesTableProps {
  companies: Company[];
}

const CompaniesTable = ({ companies }: CompaniesTableProps) => {
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
      cell: (info) => "editar ver locais excluir",
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
