import { motion } from "framer-motion";
import {
  fadeInFromLeftVariant,
  fadeInFromRightVariant,
} from "../../../animation";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import { AvatarGroup, Card } from "../../../components";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import API_WRAPPER from "../../../api";
import { options } from "../../../components/Charts/LineChart";

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

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-8 gap-4 mt-4">
      <div className="col-span-8 md:col-span-5">
        <Card>
          <motion.div
            variants={fadeInFromLeftVariant}
            initial="initial"
            animate="animate"
            className=" bg-base-100 border-[1px] border-base-300 p-4 rounded-xl"
          >
            <h2 className="text-lg font-semibold">Product Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 px-8 md:px-16 gap-4 items-center">
              <div className="flex justify-between">
                <div className="flex justify-between gap-2 items-center">
                  <div className="flex flex-col w-full text-xs">
                    <span>Total Products</span>
                    <span className="text-themeColor font-bold">
                      {productData.reduce((acc, count) => acc + count, 0)}
                    </span>
                  </div>
                  <div className="chart-container w-full">
                    {productData.length > 0 && productLabel.length > 0 && (
                      <Line
                        options={{
                          ...options,
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                        data={{
                          labels: productLabel,
                          datasets: [
                            {
                              fill: true,
                              label: "Dataset 2",
                              data: productData,
                              backgroundColor: "#4C62C3",
                              borderWidth: 0,
                            },
                          ],
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-between gap-2 items-center">
                <div className="flex flex-col text-xs">
                  <p className="w-full">Pending Orders</p>
                </div>
                <div className="chart-container w-full">
                  {productData.length > 0 && productLabel.length > 0 && (
                    <Line
                      options={{
                        ...options,
                        responsive: true,
                        maintainAspectRatio: false,
                      }}
                      data={{
                        labels: productLabel,
                        datasets: [
                          {
                            fill: true,
                            label: "Dataset 2",
                            data: productData,
                            backgroundColor: "#4C62C3",
                            borderWidth: 0,
                          },
                        ],
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </Card>
      </div>

      {/* Section for the second Line chart */}
      <div className="col-span-8 md:col-span-3">
        <Card>
          <motion.div
            variants={fadeInFromRightVariant}
            initial="initial"
            animate="animate"
            className="p-4 rounded-xl"
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
        </Card>
      </div>
    </div>
  );
};

export default ProductOverviewAndAddProduct;
