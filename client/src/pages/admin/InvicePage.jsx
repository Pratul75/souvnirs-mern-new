import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import API_WRAPPER from "../../api";
import { usePDF } from "react-to-pdf";

export const InvicePage = () => {
  const { inviceId, id } = useParams();
  const [data, setData] = useState({});
  const [signature, setSignature] = useState(null);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [storeCutBygst, setstoreCutBygst] = useState(0);
  const [categoryDetails, setCategoryDetails] = useState({});
  const {
    product_id,
    discounts,
    quantity,
    tax_id,
    price,
    total_price,
    total_paid,
    payment_method,
    currency,
    createdAt,
    updatedAt,
  } = data;

  const getOrderDetails = async () => {
    try {
      const getOrderDetails = await API_WRAPPER.post(
        `get/invoice/order/details`,
        {
          inviceId,
          id,
        }
      );
      setData(getOrderDetails?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCategoryDetails = async () => {
    try {
      const getCategory = await API_WRAPPER.get(
        `/product/by/category/details?productId=${id}`
      );
      setCategoryDetails(getCategory?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderDetails();
    getCategoryDetails();
  }, []);

  const commision = 0.13 * total_price; // Assuming commision is 13%
  const gst = 0.1 * total_price; // Assuming GST is 10%

  const getDate = (datr) => {
    const formattedCreatedAt = new Date(createdAt).toLocaleString();
    return formattedCreatedAt;
  };

  const handleSignatureChange = (event) => {
    const file = event.target.files[0];
    setSignature(URL.createObjectURL(file));
  };

  useEffect(() => {
    let sn = cutGst(
      categoryDetails?.gst_type || 1,
      categoryDetails?.gst_value || 1,
      data?.total_price || 1,
      "gst"
    );
    setstoreCutBygst(sn);
  }, [data, categoryDetails]);

  const cutGst = (type, value, total_price, name) => {
    if (name == "gst") {
      const cutCommi = formateNum(type, value);
      let valueshow = total_price * (cutCommi?.value / 100);
      return Number(total_price - valueshow).toFixed(2);
    } else {
      const cutCommi = formateNum(type, value);
      console.log("----<<<<<<", type, cutCommi, total_price, name);
      let valueshow = total_price * (cutCommi?.value / 100);
      return Number(total_price - valueshow).toFixed(2);
    }
  };

  const formateNum = (type, value) => {
    if (type == "PERCENTAGE") {
      console.log("------0", type, value);
      let main_Value = Number(value);
      main_Value = (main_Value * 100).toFixed(0);
      let values = {
        value: main_Value,
        type: "%",
      };
      return values;
    } else {
      let valueMain = Number(value);
      let values = {
        value: valueMain,
        type: "",
      };
      return values;
    }
  };

  console.log("----=+++====>", categoryDetails);

  return (
    <div>
      <div
        ref={targetRef}
        className="max-w-3xl mx-auto p-6 bg-white shadow-md relative"
      >
        {/* <input
        type="file"
        accept="image/*"
        className="absolute top-4 right-4"
        onChange={handleSignatureChange}
      /> */}
        <h1 className="text-3xl font-bold mb-4">Tax Invoice</h1>

        {/* Invoice Details */}
        <div className="flex justify-between mb-4">
          <div>
            <p>Invoice ID: {data?.invoice_id}</p>
            <p>Order Date: {getDate(data?.createdAt)}</p>
          </div>
          <div>
            <p>Payment Status: {data?.payment_status}</p>
            <p>Delivery Date: {getDate(data?.delivery_date)}</p>
          </div>
        </div>

        {/* Customer Details */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Customer Details</h2>
          <p>Name: {data?.address_id?.name}</p>
          <p>
            Address: {data?.address_id?.address}, {data?.address_id?.city},{" "}
            {data?.address_id?.country} - {data?.address_id?.pin_code}
          </p>
        </div>

        {/* Product Details */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Product Details</h2>
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 p-2">Product Name</th>
                <th className="border border-gray-400 p-2">Quantity</th>
                <th className="border border-gray-400 p-2">Price per unit</th>
                <th className="border border-gray-400 p-2">Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2">
                  {product_id?.name}
                </td>
                <td className="border border-gray-400 p-2">{quantity}</td>
                <td className="border border-gray-400 p-2">
                  {price} {currency}
                </td>
                <td className="border border-gray-400 p-2">
                  {total_price} {currency}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Calculations */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Calculations</h2>
          <table className="w-full border-collapse border border-gray-400">
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2">TOTAL PRICE</td>
                <td className="border border-gray-400 p-2">
                  {data?.total_price} {currency}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">
                  GST (
                  {
                    formateNum(
                      categoryDetails?.gst_type,
                      categoryDetails?.gst_value
                    ).value
                  }
                  {
                    formateNum(
                      categoryDetails?.gst_type,
                      categoryDetails?.gst_value
                    ).type
                  }
                  )
                </td>
                <td className="border border-gray-400 p-2">
                  {storeCutBygst} {currency}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">
                  Commision (
                  {
                    formateNum(
                      categoryDetails?.commissionType,
                      categoryDetails?.commissionTypeValue
                    ).value
                  }
                  {
                    formateNum(
                      categoryDetails?.commissionType,
                      categoryDetails?.commissionTypeValue
                    ).type
                  }
                  )
                </td>
                <td className="border border-gray-400 p-2">
                  {cutGst(
                    categoryDetails?.commissionType || 1,
                    categoryDetails?.commissionTypeValue || 1,
                    storeCutBygst || 1,
                    "commission"
                  )}{" "}
                  {currency}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">PAID AMOUNT</td>
                <td className="border border-gray-400 p-2">
                  {data?.total_paid} {currency}
                </td>
              </tr>
              <tr>
                <td
                  style={{ fontWeight: "bold" }}
                  className="border border-gray-400 p-2"
                >
                  REMAIN Amount
                </td>
                <td
                  style={{ fontWeight: "bold" }}
                  className="border border-gray-400 p-2"
                >
                  {data?.total_price - data?.total_paid} {currency}
                </td>
              </tr>
              <tr>
                <td
                  style={{ fontWeight: "bold" }}
                  className="border border-gray-400 p-2"
                >
                  Total Amount
                </td>
                <td
                  style={{ fontWeight: "bold" }}
                  className="border border-gray-400 p-2"
                >
                  {cutGst(
                    categoryDetails?.commissionType || 1,
                    categoryDetails?.commissionTypeValue || 1,
                    storeCutBygst || 1,
                    "commission"
                  )}{" "}
                  {currency}
                </td>
              </tr>
              {/* Add more calculations as needed */}
            </tbody>
          </table>
        </div>

        {/* Payment Details */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Payment Details</h2>
          <p>Payment Method: {data?.payment_method}</p>
          <p>
            Total Paid: {data?.total_paid} {data?.currency}
          </p>
        </div>

        {/* Additional Details */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Additional Details</h2>
          <p>Order Status: {data?.order_status}</p>
          <p>Bundle Status: {data?.bundle_status ? "Yes" : "No"}</p>
          {/* Add more details as needed */}
        </div>
        <img
          src="https://gift.souvnirs.com/assets/souvnirsLogo-fe6cca55.png" // Replace with the path to your logo image
          alt="Company Logo"
          className="mt-16 bottom-4 left-4 w-36 h-13"
        />
        <img
          src={
            "https://static.cdn.wisestamp.com/wp-content/uploads/2020/08/Serena-Williams-handwritten-signature.png "
          } // Replace with the path to your logo image
          alt="signature"
          className="absolute bottom-14 right-10 w-44 h-16 border border-gray-50 rounded-md"
        />
        <h3 className="absolute bottom-0 right-10 w-44 h-16">
          HL BOOKS Authorized Signature
        </h3>
      </div>
      <button
        onClick={() => toPDF()}
        className="btn bg-themeColor text-white flex items-center absolute bottom-14 right-10 w-64 h-16 border border-gray-50 rounded-md"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
        Download as Pdf
      </button>
    </div>
  );
};
