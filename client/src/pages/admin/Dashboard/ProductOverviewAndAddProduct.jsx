import { motion } from "framer-motion";
import {
  fadeInFromLeftVariant,
  fadeInFromRightVariant,
} from "../../../animation";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { PATHS } from "../../../routes/paths";
import { AvatarGroup } from "../../../components";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import API_WRAPPER from "../../../api";
import { data, options } from "../../../components/Charts/LineChart";

const ProductOverviewAndAddProduct = () => {
  const [productLabel, setProductLabel] = useState([]);
  const [productData, setProductData] = useState([]);

  const getProductData = async () => {
    try {
      const response = await API_WRAPPER.get("/dashboard/products");
      const data = response.data;
      setProductLabel(data.dates);
      setProductData(data.counts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log("ProductOverviewAndAddProduct.jsx", productData, productLabel);

  useEffect(() => {
    getProductData();
  }, []);

  // Optional chart options
  // const options = {
  //   // Set your desired options here, e.g., scales, title, tooltips, etc.
  // };

  return (
    <div className="grid grid-cols-8 gap-4 mt-4">
      <motion.div
        variants={fadeInFromLeftVariant}
        initial="initial"
        animate="animate"
        className="col-span-6 bg-base-200 p-4 rounded-xl shadow-xl"
      >
        <h2 className="text-lg font-semibold">Product Overview</h2>
        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="flex justify-between mt-4 col-span-2">
            <div className="flex justify-between gap-2 items-center">
              <div className="flex flex-col w-full">
                <span>Total Products</span>
                <span>
                  {productData.reduce((acc, count) => acc + count, 0)}
                </span>
              </div>
              <div className="chart-container">
                {productData.length > 0 && productLabel.length > 0 && (
                  <Line
                    options={options}
                    data={{
                      labels: productLabel,
                      datasets: [
                        {
                          fill: true,
                          label: "Dataset 2",
                          data: productData,
                          borderColor: "rgb(53, 162, 235)",
                          backgroundColor: "rgba(53, 162, 235, 0.5)",
                          borderWidth: 0,
                        },
                      ],
                    }}
                  />
                )}
              </div>
            </div>

            <div className="flex justify-between gap-2 items-center">
              <div className="flex flex-col w-full">
                <span>Pending Orders</span>
                <span></span>
              </div>
              <div className="chart-container">
                {productData.length > 0 && productLabel.length > 0 && (
                  <Line options={options} data={data} />
                )}
              </div>
            </div>
          </div>
          <div>
            <Link
              to={PATHS.adminAddProducts}
              className="btn btn-accent rounded-full col-span-1 w-full"
            >
              Add Products
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Section for the second Line chart */}
      <motion.div
        variants={fadeInFromRightVariant}
        initial="initial"
        animate="animate"
        className="col-span-2 bg-base-200 p-4 rounded-xl shadow-xl"
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-base-300"></div>
            <div>
              <h2>Add new product</h2>
              <p>@product Details</p>
            </div>
          </div>
          <div className="flex justify-between">
            <AvatarGroup totalAmount={99} />
            <Link
              to={PATHS.adminAddProducts}
              className="btn btn-accent btn-circle"
            >
              <AiOutlinePlus />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductOverviewAndAddProduct;
