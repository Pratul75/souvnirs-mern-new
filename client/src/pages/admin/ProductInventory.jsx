import { Header, ReusableTable } from "../../components";
import HeaderImage from "../../assets/images/headerImgOne.png";
import API_WRAPPER from "../../api";
import { useEffect, useMemo, useState } from "react";
import ReuseTable from "../../components/ui/Table/ReuseTable";
const ProductInventory = () => {
  const [productsList, setProductsList] = useState([]);
  const [editedProduct, setEditedProduct] = useState(null);
  const [apiTrigger, setApiTrigger] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPagesShow, setTotalPagesShow] = useState(0);
  const [productLoading, setProductLoading] = useState(false);
  const [seacrhText, SetSearchTex] = useState("");
  const [varientstore, setVarientstore] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "name",
      },
      // {
      //   Header: "Variant",
      //   Cell: ({ row }) => {
      //     if (row?.original?.variant?.length > 0) {
      //       return (
      //         <ul>
      //           {row.original.variant.map((item) => (
      //             <li key={item._id}>{item.name}</li>
      //           ))}
      //         </ul>
      //       );
      //     } else {
      //       return <span>No Variants</span>;
      //     }
      //   },
      // },
      // {
      //   Header: "Product Price",
      //   accessor: "price", // Assuming "price" is directly under the product object
      // },
      {
        Header: "Stock Quantity",
        accessor: "stockQuantity", // Assuming "stockQuantity" is directly under the product object
      },
      {
        Header: "Stock Status",
        accessor: "stockStatus",
        Cell: ({ row }) => {
          if (row.original?.stockStatus == "IN_STOCK") {
            return (
              <div style={{ color: "green" }}>{row.original?.stockStatus}</div>
            );
          } else {
            return (
              <div style={{ color: "red" }}>{row.original?.stockStatus}</div>
            );
          }
        },
      },
    ],
    []
  );

  const data = useMemo(() => productsList, [productsList]);

  const getAllProducts = async () => {
    try {
      setProductLoading(true);
      const response = await API_WRAPPER.get(
        `/products/get-all-products/list?page=${page}&pageSize=${pageSize}&seacrhText=${seacrhText}`
      );
      if (response.status === 200) {
        setProductLoading(false);
        setProductsList(response?.data?.productsList);
        setTotalPagesShow(response?.data?.totalPages);
        console.log("ALL PRODUCTS LIST: ", response?.data);
      }
    } catch (error) {
      console.error("Error occured while fetching all products", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [apiTrigger, page, pageSize, seacrhText]);

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

  const getAllVarients = async (proid) => {
    try {
      const result = await API_WRAPPER.get(`/product/variants/${proid}`);
      setVarientstore(result?.data?.result);
      console.log("resultL ->", result?.data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (data) => {
    getAllVarients(data?._id);
    setEditedProduct(data);
    window.editProduct_modal.showModal();
    console.log("EDIT ID: ", data._id);
  };

  const handleSave = async () => {
    if (editedProduct) {
      try {
        //     if (editedProduct?.variant) {
        //   editedProduct?.variant = varientstore
        // }
        const response = await API_WRAPPER.put(
          `/admin/products/edit/inventory/${editedProduct._id}`,
          { editedProduct, varientstore }
        );
        console.log("EDITED RESPONSE", response.data);
        setProductsList((prevList) =>
          prevList.map((product) =>
            product._id === editedProduct._id ? response.data : product
          )
        );
        getAllProducts();
        window.editProduct_modal.close();
        setEditedProduct(null);
      } catch (error) {
        console.error("Error occurred while editing product", error);
      }
    }
  };

  useEffect(() => {
    let clone = [...varientstore];
    let totalqty = 0;
    clone?.map((item) => {
      totalqty += Number(item?.quantity);
    });
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      stockQuantity: totalqty,
    }));
  }, [varientstore]);

  return (
    <div>
      <Header
        heading="Product Inventory"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        image={HeaderImage}
      />
      <div className="mt-20">
        {/* <ReusableTable
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
        /> */}

        <ReuseTable
          tableTitle="Product Inventory List"
          columns={columns}
          data={data}
          showButtons
          enableEdit
          enableDelete
          onEdit={handleEdit}
          onDelete={handleDelete}
          enablePagination
          pageSize={10}
          setPageSizeshow={setPageSize}
          setPageNumber={setPage}
          pageSizeShow={pageSize}
          pageNumber={page}
          totalPagesShow={totalPagesShow}
          productLoading={productLoading}
          SetSearchTex={SetSearchTex}
          seacrhText={seacrhText}
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
                      {/* <option value="BACK_ORDER">Back Order</option> */}
                    </select>
                  </label>
                </div>
                {varientstore.length > 0 && (
                  <h style={{ fontSize: "20px" }}>Variants Quantity:</h>
                )}
                <div>
                  {varientstore?.map((items, index) => {
                    return (
                      <>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">
                              {Object.keys(items?.variant)?.map((itm, ind) => {
                                return (
                                  <div>{`${itm}:  ${items?.variant[itm]}`}</div>
                                );
                              })}
                              {/* varient Quantity:{items?.variant} ) */}
                            </span>
                            <input
                              className="input input-primary"
                              type="text"
                              value={varientstore[index]?.quantity}
                              onChange={
                                (e) => {
                                  let clone = [...varientstore];
                                  clone[index].quantity = e?.target?.value;
                                  setVarientstore(clone);
                                }
                                // setEditedProduct((prevProduct) => ({
                                //   ...prevProduct,
                                //   stockQuantity: e.target.value,
                                // }))
                              }
                            />
                          </label>
                        </div>
                      </>
                    );
                  })}
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
