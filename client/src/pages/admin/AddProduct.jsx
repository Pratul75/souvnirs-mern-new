import { Header } from "../../components";
import HeaderImgTwo from "../../assets/images/headerImgTwo.png";
import { TextEditor } from "../../components";
import { BiReset } from "react-icons/bi";
import { useEffect } from "react";
import API_WRAPPER from "../../api";
const AddProduct = () => {
  const getAllProducts = async () => {
    const data = await API_WRAPPER.get("/products/get-all-products");
    console.log("DATA: ", data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <Header
        heading="Add Products"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to  "
        image={HeaderImgTwo}
      />
      <div className="w-full flex">
        <div className="w-2/3">
          <div className="mt-6 mx-4">
            <div className="form-control">
              <label className="label">
                <div>
                  <span className="label-text font-semibold">Write Title</span>
                </div>
              </label>
              <input
                className="input input-sm input-bordered"
                placeholder="Title for product"
                type="text"
                name=""
                id=""
              />
            </div>
            <h3 className="mt-4 text-2xl">Product</h3>
            <TextEditor />

            <div>
              <h4 className="text-xl mt-16">Data</h4>
              <div className="flex gap-2 mt-2">
                <button className="btn btn-sm cursor-pointer  bg-[#4680FF]  text-white">
                  attrbs
                </button>
                <button className="btn btn-outline btn-sm cursor-pointer  bg-[#4680FF]  text-white">
                  attrbs 1
                </button>
                <button className="btn btn-outline btn-sm cursor-pointer  bg-[#4680FF]  text-white">
                  attrbs 2
                </button>
                <button className="btn btn-outline btn-sm cursor-pointer  bg-[#4680FF]  text-white">
                  attrbs 3
                </button>
                <button className="btn btn-outline btn-sm cursor-pointer  bg-[#4680FF]  text-white">
                  attrbs 4
                </button>
                <button className="btn btn-outline btn-sm cursor-pointer  bg-[#4680FF]  text-white">
                  attrbs 5
                </button>
                <button className="btn btn-outline btn-sm cursor-pointer  bg-[#4680FF]  text-white">
                  attrbs 6
                </button>
                <button className="btn btn-outline btn-sm cursor-pointer  bg-[#4680FF]  text-white">
                  attrbs 7
                </button>
                <button className="btn btn-outline btn-sm cursor-pointer  bg-[#4680FF]  text-white">
                  attrbs 8
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 border-[1px] bg-base-200 p-4">
          <button className="btn btn-outline bg-[#4680FF] font-thin w-full text-white hover:bg-[#6c98f8]">
            Preview Changed
          </button>
          <div className="flex justify-between items-center mt-4">
            <h3 className="text-2xl mt-4">Published</h3>
            <button className="btn btn-outline btn-info text-white">
              <BiReset size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
