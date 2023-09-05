import { useEffect, useState } from "react";
import { Header } from "../../components";
import API_WRAPPER from "../../api";
import { debouncedShowToast } from "../../utils";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import {
  fadeInFromLeftVariant,
  fadeInFromRightVariant,
  fadeInVariants,
} from "../../animation";

const AddCommissions = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const getCategories = async () => {
    try {
      const response = await API_WRAPPER.get("/category/get-all-categories");
      if (response.status === 200) {
        setCategories(response.data);
        console.log("CATEGORIES RESPONSE: ", response.data);
        debouncedShowToast("Categories added successfully", "success");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <Header
        heading="Commissions"
        subheading="This page provides an overview of everything related to commissions, and admin can edit and delete various entries as per the need"
      />
      <div className="mt-8">
        <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
          <motion.div
            variants={fadeInVariants}
            initial="initial"
            animate="animate"
            className="rounded-xl col-span-2 bg-base-100 p-4"
          >
            <h3>Category List</h3>
            <div className="form-control my-4">
              <select
                onChange={(e) => handleCategorySelect(e)}
                className="select select-primary"
              >
                {categories.length > 0 &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
          </motion.div>
          {selectedCategory && (
            <>
              <motion.div
                variants={fadeInFromLeftVariant}
                initial="initial"
                animate="animate"
                className="rounded-xl bg-base-100 p-4"
              >
                <h3>Category Type</h3>
                <div className="form-control my-4">
                  <select className="select select-primary">
                    <option value="PERCENTAGE">% (percentage)</option>
                    <option value="NUMBER">$ (number)</option>
                  </select>
                </div>
              </motion.div>
              <motion.div
                variants={fadeInFromRightVariant}
                initial="initial"
                animate="animate"
                className="rounded-xl bg-base-100 p-4"
              >
                <h3>Commission Type Value</h3>
                <div className="form-control my-4">
                  <input
                    className="input-primary input"
                    type="text"
                    name=""
                    id=""
                  />
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
      <button className="btn btn-primary my-4 float-right">Submit</button>
      <ToastContainer />
    </div>
  );
};

export default AddCommissions;
