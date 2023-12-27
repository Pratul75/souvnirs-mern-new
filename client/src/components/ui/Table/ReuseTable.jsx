import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useRowSelect,
  usePagination, // Import the usePagination hook
} from "react-table";
import "daisyui/dist/full.css";
import { nanoid } from "nanoid";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { DeleteBtnSvg, EditBtnSvg, EyeBtnSvg } from "../../../icons/tableIcons";
import { motion } from "framer-motion";
import { fadeInVariants } from "../../../animation";
import IndeterminateCheckbox from "../IndeterminateCheckbox";
import {
  BiFirstPage,
  BiLastPage,
  BiRightArrowAlt,
  BiLeftArrowAlt,
} from "react-icons/bi";
import Card from "../../ui/Card";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import API_WRAPPER from "../../../api";
import Loading from "../../../pages/common/Loading";
import { LoadingComponent } from "../../LoadinComponent/LoadingComponent";
const ReuseTable = ({
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
  pageSize,
  enablePagination,
  children,
  refresh,

  setPageSizeshow,
  setPageNumber,
  pageSizeShow,
  pageNumber,
  totalPagesShow,
  productLoading,
  SetSearchTex,
  seacrhText,
}) => {
  // Add the usePagination hook to the table instance
  console.log();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Use 'page' instead of 'rows'
    prepareRow,
    state,
    setGlobalFilter,
    selectedFlatRows,
    gotoPage,
    setPageSize,
    pageCount,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: Number(pageSize) }, // Set initial pageSize
    },
    useGlobalFilter,
    useSortBy,
    usePagination, // Use the usePagination hook
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

  console.log("))))=>", page);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [inputValue, setInputValue] = useState({
    id: "",
    title: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const handleEditClick = (original) => {
    setMenuName(original.menuName); // You can initialize the input with the current menu name
    setPopupOpen(true);
  };

  const handleSave = async (newMenuName) => {
    // /update/menu/:id
    // Close the popup
    const response = await API_WRAPPER.patch(`/update/menu/${newMenuName.id}`, {
      title: newMenuName.title,
    });
    refresh();
    setPopupOpen(false);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const serachFilterData = (value) => {
    SetSearchTex(value);
    //??
    setPageNumber(1);
    setPageSizeshow(10);
  };

  const onViews = (id) => {
    // console.log("===>", id);
    navigate(`${PATHS?.adminChildMenu}/${id?.id}`);
  };
  // to get global filter state
  const { globalFilter, pageIndex } = state; // Destructure the 'pageIndex' from state

  // Function to handle changing the page
  const handlePageChange = (pageIndex) => {
    setPageNumber(pageIndex);
    // gotoPage(pageIndex);
  };

  // Function to handle changing the page size
  const handlePageSizeChange = (event) => {
    const pageSize = Number(event.target.value);
    setPageNumber(1);
    setPageSizeshow(pageSize);
    setPageSize(pageSize);
  };

  // Pass the selected row IDs data to the parent component
  isSelectable &&
    useEffect(() => {
      const selectedRows = selectedFlatRows.map((row) => row.original);
      const unselectedRows = page
        .filter((row) => {
          return !selectedFlatRows.find(
            (selectedRow) => selectedRow.id === row.id
          );
        })
        .map((row) => row.original);

      onSelectedRowObjectsChange(selectedRows, unselectedRows);
    }, [selectedFlatRows, page]);

  //////////////////// check data length and return spinners
  // Check if data array is empty, if so, don't render pagination
  // if (enablePagination && data.length === 0) {
  //   return (
  //     <div className="text-center mt-4">
  //       <span className="loading  loading-ring loading-lg text-primary"></span>
  //     </div>
  //   );
  // }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeInVariants}
      className="w-screen md:w-auto"
    >
      <div className="flex  items-center my-4">
        <h1 className="text-xl hidden md:block">{tableTitle && tableTitle}</h1>
        <input
          type="text"
          value={seacrhText || ""}
          onChange={(e) => serachFilterData(e.target.value)}
          placeholder="search table here"
          className="input input-bordered w-full mb-2 mx-2 md:w-auto md:mb-0"
        />
      </div>
      <div className="overflow-x-auto width-full max-w-full">
        <Card>
          <table className="table" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr key={nanoid()} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      className="bg-base-300"
                      key={nanoid()}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <div className="flex items-center">
                        <span>{column.render("Header")}</span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <AiOutlineSortDescending
                              size={22}
                              className="ml-1"
                            />
                          ) : (
                            <AiOutlineSortAscending
                              size={22}
                              className="ml-1"
                            />
                          )
                        ) : null}
                      </div>
                    </th>
                  ))}
                  {showButtons && <th className="bg-base-300">Action</th>}
                </tr>
              ))}
            </thead>
            {productLoading ? (
              <LoadingComponent />
            ) : (
              <tbody {...getTableBodyProps()}>
                {page.length > 0 ? (
                  page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        className={`${
                          row.isSelected ? "bg-primary" : "bg-base-100"
                        }`}
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
                            {/*  (location?.pathname=="/admin/menus") */}
                            {enableEdit &&
                              location.pathname != "/admin/cart" && (
                                <span
                                  className="cursor-pointer"
                                  onClick={() => {
                                    if (location.pathname == "/admin/menus") {
                                      setInputValue({
                                        id: row.original?.id,
                                        title: row.original?.title,
                                      });
                                      handleEditClick(row.original);
                                    } else {
                                      onEdit(row.original);
                                    }
                                  }}
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
                            {/* EyeBtnSvg */}
                            {enableEdit &&
                            location?.pathname == `/admin/menus` ? (
                              <span
                                className="cursor-pointer"
                                onClick={() => onViews(row.original)}
                              >
                                <EyeBtnSvg />
                              </span>
                            ) : null}
                          </td>
                        )}
                      </tr>
                    );
                  })
                ) : (
                  <div style={{ height: "100px", marginTop: "10px" }}>
                    No Data found
                  </div>
                )}
              </tbody>
            )}
          </table>
        </Card>
      </div>
      {enablePagination && data.length > 0 && (
        // Render pagination controls only if enablePagination prop is true and data is not empty
        <div className="w-full flex justify-center ">
          <div className="flex gap-1 justify-between w-full items-center mt-4 bg-base-300 rounded-xl p-4">
            <div>
              <label>Page Size</label>
              <select
                value={pageSizeShow}
                // disabled={pageNumber > totalPagesShow - 10}
                onChange={handlePageSizeChange}
                className=" select select-sm select-primary input-bordered mx-2"
              >
                {[5, 10, 25, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                onClick={() => handlePageChange(1)}
                disabled={pageNumber === 1}
                className="btn btn-square btn-sm btn-primary"
              >
                <BiFirstPage className="text-xl" />
              </button>
              <button
                onClick={() => handlePageChange(pageNumber - 1)}
                disabled={pageNumber === 1}
                className="btn btn-square btn-sm btn-primary mx-2"
              >
                <BiLeftArrowAlt className="text-xl" />
              </button>
              <span className="text-lg">
                Page{" "}
                <strong>
                  {pageNumber} of {totalPagesShow}
                </strong>{" "}
              </span>
              <button
                onClick={() => handlePageChange(pageNumber + 1)}
                disabled={pageNumber === totalPagesShow}
                className="btn btn-square btn-sm btn-primary mx-2"
              >
                <BiRightArrowAlt className="text-xl" />
              </button>
              <button
                onClick={() => handlePageChange(totalPagesShow)}
                disabled={pageNumber === totalPagesShow}
                className="btn btn-square btn-primary btn-sm"
              >
                <BiLastPage className="text-xl" />
              </button>
              {/* Select for page size */}
            </div>
          </div>
          <EditPopup
            isOpen={isPopupOpen}
            onClose={handleClosePopup}
            onSave={handleSave}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>
      )}
    </motion.div>
  );
};

ReuseTable.propTypes = {
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
  pageSize: PropTypes.string,
  enablePagination: PropTypes.bool,
};

const EditPopup = ({ isOpen, onClose, onSave, inputValue, setInputValue }) => {
  const handleInputChange = (e) => {
    setInputValue({ ...inputValue, title: e.target.value });
  };

  const handleSaveClick = () => {
    onSave(inputValue);
    setInputValue("");
    onClose();
  };

  return (
    <div className={`fixed inset-0 ${isOpen ? "block" : "hidden"}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-4 w-1/3 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Edit Menu</h2>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            placeholder="Enter Menu Name"
            value={inputValue.title}
            onChange={handleInputChange}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSaveClick}
          >
            Save
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded ml-2 hover:bg-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReuseTable;
