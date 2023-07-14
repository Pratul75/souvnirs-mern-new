import PropTypes from "prop-types";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import "daisyui/dist/full.css";
import { nanoid } from "nanoid";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { DeleteBtnSvg, EditBtnSvg, EyeBtnSvg } from "../../icons/tableIcons";
const ReusableTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  onShow,
  showButtons,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  // to get global filter state
  const { globalFilter } = state;

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 float-right">
        <input
          type="text"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="search table here"
          className="input input-bordered"
        />
      </div>
      <table
        className="table table-zebra border shadow-xl"
        {...getTableProps()}
      >
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
                        <AiOutlineSortDescending size={22} className="ml-1" />
                      ) : (
                        <AiOutlineSortAscending size={22} className="ml-1" />
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

                {/* Conditionally rendering the component */}
                {showButtons && (
                  <td className="flex gap-4">
                    <span
                      onClick={() => onShow(row.original)}
                      className="cursor-pointer"
                    >
                      <EyeBtnSvg />
                    </span>
                    <span
                      className="cursor-pointer"
                      onClick={() => onEdit(row.original)}
                    >
                      <EditBtnSvg />
                    </span>

                    <span
                      className="cursor-pointer"
                      onClick={() => onDelete(row.original)}
                    >
                      <DeleteBtnSvg />
                    </span>
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
  onShow: PropTypes.func,
  showButtons: PropTypes.bool,
};

export default ReusableTable;
