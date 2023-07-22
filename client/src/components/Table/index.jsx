import { useEffect } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useRowSelect,
} from "react-table";
import "daisyui/dist/full.css";
import { nanoid } from "nanoid";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { DeleteBtnSvg, EditBtnSvg, EyeBtnSvg } from "../../icons/tableIcons";
import { motion } from "framer-motion";
import { fadeInVariants } from "../../animation";
import IndeterminateCheckbox from "../IndeterminateCheckbox";

const ReusableTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  onShow,
  enableEdit,
  enableDelete,
  enableShowDetials,
  showButtons,
  onSelectedRowObjectsChange,
  isSelectable,
  tableTitle,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        isSelectable
          ? {
              id: "selection",
              //
              Header: ({ getToggleAllRowsSelectedProps }) => (
                <div>
                  <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                </div>
              ),
              // The cell can use the individual row's getToggleRowSelectedProps method
              // to render a checkbox
              Cell: ({ row }) => (
                <div>
                  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
              ),
            }
          : {},
        ...columns,
      ]);
    }
  );

  // to get global filter state
  const { globalFilter } = state;

  // Pass the selected row IDs data to the parent component
  isSelectable &&
    useEffect(() => {
      const selectedRows = selectedFlatRows.map((row) => row.original);
      const unselectedRows = rows
        .filter((row) => {
          return !selectedFlatRows.find(
            (selectedRow) => selectedRow.id === row.id
          );
        })
        .map((row) => row.original);

      onSelectedRowObjectsChange(selectedRows, unselectedRows);
    }, [selectedFlatRows, rows]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeInVariants}
      className="overflow-x-auto"
    >
      <div className="flex justify-between items-center my-4">
        <h1 className="ml-16 text-xl">{tableTitle || "Table Title"}</h1>
        <input
          type="text"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="search table here"
          className="input input-bordered"
        />
      </div>
      <table className="table   shadow-xl" {...getTableProps()}>
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
              <tr
                className={`${row.isSelected ? "bg-accent" : "bg-base-200"}`}
                key={nanoid()}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <td key={nanoid()} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}

                {/* Conditionally rendering the component */}
                {showButtons && (
                  <td className="flex gap-4">
                    {enableShowDetials && (
                      <span
                        onClick={() => onShow(row.original)}
                        className="cursor-pointer"
                      >
                        <EyeBtnSvg />
                      </span>
                    )}
                    {enableEdit && (
                      <span
                        className="cursor-pointer"
                        onClick={() => onEdit(row.original)}
                      >
                        <EditBtnSvg />
                      </span>
                    )}

                    {enableDelete && (
                      <span
                        className="cursor-pointer"
                        onClick={() => onDelete(row.original)}
                      >
                        <DeleteBtnSvg />
                      </span>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </motion.div>
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
  tableTitle: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onShow: PropTypes.func,
  showButtons: PropTypes.bool,
  enableEdit: PropTypes.bool,
  enableDelete: PropTypes.bool,
  enableShowDetials: PropTypes.bool,
  onSelectedRowObjectsChange: PropTypes.func,
  isSelectable: PropTypes.bool,
};

export default ReusableTable;
