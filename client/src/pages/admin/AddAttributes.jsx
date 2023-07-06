import { Header } from "../../components";
import CategoryBnnerImng from "../../assets/images/categoryManagement.png";
const AddAttribute = () => {
  return (
    <div className="w-full">
      <Header
        heading="Add Attribute"
        image={CategoryBnnerImng}
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, "
      />
      <div className="w-full flex justify-between px-4 py-2 border-[1px] border-base-300 mt-4">
        <h3 className="text-2xl">Attribute</h3>
      </div>

      <div className="flex flex-col gap-4 items-center justify-center p-4 border-[1px] border-base-300">
        <div className="form-control  w-1/3">
          <label className="label"></label>
        </div>
        <div className="form-control w-1/3">
          <input className="input input-info" placeholder="add attribute" />
        </div>

        <button className="btn btn-info text-white w-1/3">Submit</button>
      </div>
    </div>
  );
};

export default AddAttribute;
