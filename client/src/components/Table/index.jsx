import PropTypes from "prop-types";
import { useTable, useSortBy } from "react-table";
import "daisyui/dist/full.css";
import { nanoid } from "nanoid";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

const ReusableTable = ({ columns, data, onEdit, onDelete, showButtons }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy // Add the useSortBy plugin
    );

  return (
    <div className="overflow-x-auto">
      <table className="table" {...getTableProps()}>
        {/* Add getTableProps() to table */}
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={nanoid()} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  key={nanoid()}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <div className="flex items-center">
                    <span>{column.render("Header")}</span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <AiOutlineSortDescending size={20} className="ml-1" />
                      ) : (
                        <AiOutlineSortAscending size={20} className="ml-1" />
                      )
                    ) : null}
                  </div>
                </th>
              ))}
              {showButtons && <th>Action</th>}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr key={nanoid()} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td key={nanoid()} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
                {showButtons && (
                  <td>
                    <button
                      className="btn btn-square btn-primary mr-2"
                      onClick={() => onEdit(row.original)}
                    >
                      <FiEdit2 color="white" />
                    </button>
                    <button
                      className="btn btn-square btn-error  mr-2"
                      onClick={() => onDelete(row.original)}
                    >
                      <RiDeleteBinLine color="white" />
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

ReusableTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      Cell: PropTypes.elementType,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  showButtons: PropTypes.bool, // New prop
};

export default ReusableTable;
