import { motion } from "framer-motion";
import {
  fadeInFromLeftVariant,
  fadeInFromRightVariant,
} from "../../../animation";
import { Line } from "react-chartjs-2";
import { data, options } from "../../../components/Charts/LineChart";
import { Link } from "react-router-dom";
import { PATHS } from "../../../routes/paths";
import { AvatarGroup } from "../../../components";
import { AiOutlinePlus } from "react-icons/ai";
const ProductOverviewAndAddProduct = () => {
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
                <span>34,686</span>
              </div>
              <div className="chart-container">
                {" "}
                {/* Apply specific height and width */}
                <Line options={options} data={data} />
              </div>
            </div>

            <div className="flex justify-between gap-2 items-center">
              <div className="flex flex-col w-full">
                <span>Total Products</span>
                <span>34,686</span>
              </div>
              <div className="chart-container">
                {" "}
                {/* Apply specific height and width */}
                <Line options={options} data={data} />
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
