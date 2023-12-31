import { Header, ReusableTable } from "../../components";
import HeaderImage from "../../assets/images/headerImgOne.png";
import API_WRAPPER from "../../api";
import { useEffect, useMemo, useState } from "react";
const ProductInventory = () => {
  const [productsList, setProductsList] = useState([]);
  const [editedProduct, setEditedProduct] = useState(null);
  const [apiTrigger, setApiTrigger] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "name",
      },
      {
        Header: "Variant",
        Cell: ({ row }) => {
          if (row?.original?.result?.variant) {
            const keys = Object.keys(row?.original?.result?.variant);

            return keys.map((key) => (
              <p>
                {key}:{row?.original?.result?.variant[key]}
              </p>
            ));
          } else {
            return <p> </p>;
          }
        },
      },
      {
        Header: "Product Price",
        accessor: "result.price",
      },
      {
        Header: "Stock Quantity",
        accessor: "result.quantity",
      },
      {
        Header: "Stock Status",
        accessor: "stockStatus",
      },
    ],
    []
  );
  const data = useMemo(() => productsList, [productsList]);

  const getAllProducts = async () => {
    try {
      const response = await API_WRAPPER.get("/products/get-all-products");
      if (response.status === 200) {
        setProductsList(response?.data);
        console.log("ALL PRODUCTS LIST: ", response?.data);
      }
    } catch (error) {
      console.error("Error occured while fetching all products", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [editedProduct, apiTrigger]);

  const handleDelete = async (data) => {
    try {
      const response = await API_WRAPPER.delete(
        `/products/delete-product/:${data._id}`
      );
      console.log("Response: ", response?.data);
      setApiTrigger((prevState) => !prevState);
    } catch (error) {
      console.error("Error occured while deleting product", error);
    }
    console.log("DELETE ID: ", data._id);
  };

  const handleEdit = (data) => {
    setEditedProduct(data);
    window.editProduct_modal.showModal();
    console.log("EDIT ID: ", data._id);
  };

  const handleSave = async () => {
    if (editedProduct) {
      try {
        const response = await API_WRAPPER.put(
          `/products/edit-product/:${editedProduct._id}`,
          editedProduct
        );
        console.log("EDITED RESPONSE", response.data);
        setProductsList((prevList) =>
          prevList.map((product) =>
            product._id === editedProduct._id ? response.data : product
          )
        );
        window.editProduct_modal.close();
        setEditedProduct(null);
      } catch (error) {
        console.error("Error occurred while editing product", error);
      }
    }
  };

  return (
    <div>
      <Header
        heading="Product Inventory"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        image={HeaderImage}
      />
      <div className="mt-20">
        <ReusableTable
          tableTitle="Product Inventory List"
          columns={columns}
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showButtons={true}
          enableEdit
          enablePagination
          pageSize={10}
          enableDelete
        />

        {/* edit modal */}
        <dialog id="editProduct_modal" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Edit Product</h3>
            {/* Render the inputs for editing the product data */}
            {editedProduct && (
              <div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Product Stock Quantity:</span>
                    <input
                      className="input input-primary"
                      type="text"
                      value={editedProduct.stockQuantity}
                      onChange={(e) =>
                        setEditedProduct((prevProduct) => ({
                          ...prevProduct,
                          stockQuantity: e.target.value,
                        }))
                      }
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Product Stock Status:</span>
                    <select
                      className="select select-bordered select-primary"
                      value={editedProduct.stockStatus}
                      onChange={(e) =>
                        setEditedProduct((prevProduct) => ({
                          ...prevProduct,
                          stockStatus: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select Stock Status</option>
                      <option value="IN_STOCK">In Stock</option>
                      <option value="OUT_OF_STOCK">Out of Stock</option>
                      <option value="BACK_ORDER">Back Order</option>
                    </select>
                  </label>
                </div>
              </div>
            )}
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
              <button
                className="btn"
                onClick={() => window.editProduct_modal.close()}
              >
                Close
              </button>
            </div>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default ProductInventory;
