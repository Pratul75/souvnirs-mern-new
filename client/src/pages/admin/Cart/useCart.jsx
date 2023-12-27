import { useEffect, useState } from "react";
import API_WRAPPER from "../../../api";
import { debouncedShowToast } from "../../../utils";

function useCart() {
  const [cartList, setCartList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [editedCart, setEditedCart] = useState({});
  const [apiTrigger, setApiTrigger] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPagesShow, setTotalPagesShow] = useState(0);
  const [productLoading, setProductLoading] = useState(false);
  const [seacrhText, SetSearchTex] = useState("");
  const handleEditChange = (e) => {
    setEditedCart({ ...editedCart, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API_WRAPPER.put(
        `/cart/update-cart/:${selectedRow._id}`,
        editedCart
      );
      if (response?.status) {
        setApiTrigger((prevState) => !prevState);
        debouncedShowToast("Selected row updated successfully!");
        window.cart_edit_modal.close();
      }
    } catch (error) {
      debouncedShowToast(error.message, "error");
    }
  };

  const getCartList = async () => {
    try {
      const response = await API_WRAPPER.get(
        `/cart/get-all-carts/list?page=${page}&pageSize=${pageSize}&seacrhText=${seacrhText}`
      );
      if (response.status === 200) {
        setCartList(response.data?.carts);
        setTotalPagesShow(response.data?.totalPages);
        // debouncedShowToast("Cart list loaded successfully", "success");
        console.log("Cart List: ", response?.data);
      }
    } catch (error) {
      debouncedShowToast(error.message, "error");
      console.error("Error occured while fetching all cart list", error);
    }
  };

  const handleDelete = async (row) => {
    console.log("ROW TO BE DELETED:==> ", row);
    window.cart_delete_modal.showModal();
    // const response = await API_WRAPPER.delete(`/cart/delete-cart/${row._id}`);
    setSelectedRow(row);
    // getCartList();
  };

  const handleEdit = (row) => {
    window.cart_edit_modal.showModal();
    console.log("ROW TO BE EDITED: ", row);
    setSelectedRow(row);
  };

  useEffect(() => {
    getCartList();
  }, [apiTrigger, page, pageSize, seacrhText]);

  return {
    cartList,
    apiTrigger,
    handleDelete,
    handleEdit,
    handleEditChange,
    onHandleSubmit,
    selectedRow,
    getCartList,
    setPageSize,
    setPage,
    pageSize,
    page,
    totalPagesShow,
    productLoading,
    SetSearchTex,
    seacrhText,
  };
}

export default useCart;
