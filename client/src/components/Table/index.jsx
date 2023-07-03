import PropTypes from "prop-types";
import { useTable } from "react-table";
import "daisyui/dist/full.css";
import { nanoid } from "nanoid";

const ReusableTable = ({ columns, data, onEdit, onDelete }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={nanoid()} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th key={nanoid()} {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
              <th>Action</th>
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
                <td>
                  <button
                    className="btn btn-xs btn-primary mr-2"
                    onClick={() => onEdit(row.original)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => onDelete(row.original.id)}
                  >
                    Delete
                  </button>
                </td>
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
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ReusableTable;
