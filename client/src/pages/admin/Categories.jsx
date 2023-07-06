import { Link } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import { DashboardCard } from "../../components";
import { getRandomColor } from "../../../utils";
const Categories = () => {
  return (
    <div className="flex flex-col w-full h-auto md:flex-row lg:flex-row">
      <h1 className="text-2xl text-base-300">Categories</h1>
      <Link className="btn btn-primary btn-sm" to={PATHS.adminAddCategory}>
        Add Category
      </Link>

      <DashboardCard iconColor={getRandomColor()} />
    </div>
  );
};

export default Categories;
