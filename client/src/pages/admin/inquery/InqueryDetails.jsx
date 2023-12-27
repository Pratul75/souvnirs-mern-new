import React, { useEffect, useState } from "react";
import { Header } from "../../../components";
import classNames from "classnames";
import API_WRAPPER from "../../../api";
import { useParams } from "react-router-dom";

export const InqueryDetails = () => {
  const [state, setState] = useState({});
  const { id, variantId } = useParams();
  // ${PATHS.getInqueryDetails}/:id/:variantId
  const getDetails = async () => {
    try {
      const result = await API_WRAPPER.get(
        `/get/inquery/details?Id=${id}&varientId=${variantId}`
      );
      setState(result?.data?.inquery[0]);
      console.log("0000____---->", result?.data?.inquery[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      <Header
        heading="Inquery Details"
        // subheading="This is admin dashboard which provides all the details in a very conscise and user friendly way."
        // image={dashboardBannerImage}
      />
      <div
        style={{
          margin: "auto",
          width: "50%",
          border: "1px solid",
          marginTop: "10px",
          borderRadius: "5px",
        }}
        className={classNames(
          "flex",
          "flex-col", // Change flex-wrap to flex-col
          "dark:bg-gray-800",
          "p-4"
        )}
        // className={classNames(
        //   "flex",
        //   "m-28",
        //   "flex-wrap",
        //   "w-50",
        //   "dark:bg-gray-800",
        //   "p-4"
        // )}
      >
        <div
          className={classNames(
            "flex",
            "flex-col",
            "bg-white",
            "dark:bg-gray-700",
            "p-4",
            // "m-7",
            "ml-auto",
            // "mb-8",
            "rounded-md",
            "shadow-md",
            "w-full"
            // "sm:w-1/2",
            // "md:w-1/3",
            // "lg:w-1/4"
          )}
        >
          <input
            type="text"
            className={classNames(
              "p-3",
              "mb-9",
              "border",
              "border-gray-300",
              "rounded-md",
              "focus:outline-none",
              "dark:border-gray-600"
            )}
            value={state?.name}
            placeholder="name"
          />
          <input
            type="text"
            className={classNames(
              "p-3",
              "border",
              "border-gray-300",
              "rounded-md",
              "focus:outline-none",
              "dark:border-gray-600"
            )}
            value={state?.email}
            placeholder="email"
          />
        </div>
        <div
          className={classNames(
            "flex",
            "flex-col",
            "bg-white",
            "dark:bg-gray-700",
            "p-4",
            "ml-auto",
            "rounded-md",
            "shadow-md",
            "w-full"
          )}
        >
          <input
            type="text"
            className={classNames(
              "p-3",
              "mb-9",
              "border",
              "border-gray-300",
              "rounded-md",
              "focus:outline-none",
              "dark:border-gray-600"
            )}
            placeholder="company"
            value={state?.company}
          />
          <input
            type="text"
            className={classNames(
              "p-3",
              "border",
              "border-gray-300",
              "rounded-md",
              "focus:outline-none",
              "dark:border-gray-600"
            )}
            placeholder="pincode"
            value={state?.pincode}
          />
        </div>
        <div
          className={classNames(
            "flex",
            "flex-col",
            "bg-white",
            "dark:bg-gray-700",
            "p-4",
            "ml-auto",
            "rounded-md",
            "shadow-md",
            "w-full"
          )}
        >
          <input
            type="text"
            className={classNames(
              "p-3",
              "mb-4",
              "border",
              "border-gray-300",
              "rounded-md",
              "focus:outline-none",
              "dark:border-gray-600"
            )}
            placeholder="city"
            value={state?.city}
          />
          <input
            type="text"
            className={classNames(
              "p-3",
              "border",
              "border-gray-300",
              "rounded-md",
              "focus:outline-none",
              "dark:border-gray-600"
            )}
            placeholder="quantity"
            value={state?.quantity}
          />
        </div>
        <div
          className={classNames(
            "flex",
            "flex-col",
            "bg-white",
            "dark:bg-gray-700",
            "p-4",
            "ml-auto",
            "rounded-md",
            "shadow-md",
            "w-full"
          )}
        >
          <input
            type="text"
            className={classNames(
              "p-3",
              "mb-4",
              "border",
              "border-gray-300",
              "rounded-md",
              "focus:outline-none",
              "dark:border-gray-600"
            )}
            placeholder="expact data"
            value={state?.expected_date}
          />
          <textarea
            type="text"
            className={classNames(
              "p-3",
              "border",
              "border-gray-300",
              "rounded-md",
              "focus:outline-none",
              "dark:border-gray-600"
            )}
            placeholder="message"
            value={state?.msg}
          />
        </div>
        <div
          className={classNames(
            "flex",
            "flex-col",
            "bg-white",
            "dark:bg-gray-700",
            "p-4",
            "ml-auto",
            "mb-4",
            "rounded-md",
            "shadow-md",
            "w-full"
          )}
        >
          <input
            type="text"
            className={classNames(
              "p-3",
              "mb-4",
              "border",
              "border-gray-300",
              "rounded-md",
              "focus:outline-none",
              "dark:border-gray-600"
            )}
            placeholder="Time extension"
            value={state?.time_extension}
          />
          <select
            className={classNames(
              "p-3",
              "mb-4",
              "border",
              "border-gray-300",
              "rounded-md",
              "focus:outline-none",
              "dark:border-gray-600"
            )}
          >
            <option disabled>Select status</option>
            <option selected={state?.status == "PENDING"} value="PENDING">
              PENDING
            </option>
            <option selected={state?.status == "PROCESS"} value="PROCESS">
              PROCESS
            </option>
            <option selected={state?.status == "COMPLETE"} value="COMPLETE">
              COMPLETE
            </option>
            <option selected={state?.status == "CANCEL"} value="CANCEL">
              CANCEL
            </option>
          </select>
          {/* <textarea
            type="text"
            className={classNames(
              "p-3",
              "border",
              "border-gray-300",
              "rounded-md",
              "focus:outline-none",
              "dark:border-gray-600"
            )}
            placeholder="message"
            value={state?.msg}
          /> */}
          <div
            //  className="fixed bottom-4 right-4"
            className="mt-6"
          >
            <button
              className={classNames(
                "p-2",
                "bg-blue-500",
                "text-white",
                "rounded-lg",
                "focus:outline-none"
              )}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Centered button fixed at the bottom right */}
    </div>
  );
};
