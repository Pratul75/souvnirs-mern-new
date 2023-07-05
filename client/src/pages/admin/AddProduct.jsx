import { Header, Tabs } from "../../components";
import HeaderImgTwo from "../../assets/images/headerImgTwo.png";
import { TextEditor } from "../../components";
import { BiReset } from "react-icons/bi";
import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import API_WRAPPER from "../../api";

const AddProduct = () => {
  const getAllProducts = async () => {
    const data = await API_WRAPPER.get("/products/get-all-products");
    console.log("DATA: ", data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const tabs = [
    {
      label: "Media",
      content: (
        <div>
          <div className="flex gap-8">
            <div className="flex gap-4">
              <h1>Add Thumbnail</h1>
              <span className="text-gray-400">(jpeg/png)</span>
            </div>
            <div className="flex gap-4">
              <h1>Add gallery</h1>
              <span className="text-gray-400">(jpeg/png)</span>
            </div>
          </div>
          <hr />
          <div className="flex gap-8 mt-6">
            <div className="w-60 h-60 bg-base-300 rounded-xl cursor-pointer flex items-center justify-center">
              Recommended 800 x 800
            </div>
            <div className="w-60 h-60 bg-base-300 rounded-xl cursor-pointer flex items-center justify-center">
              Recommended 800 x 800
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Inventory",
      content: (
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label>SKU</label>
            <input
              className="input input-sm w-[80%]"
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="flex items-center justify-start gap-20">
            <label>Manage Stock?</label>
            <input
              className="checkbox checkbox-info checkbox-sm "
              type="checkbox"
              name=""
              id=""
            />
            <span>Manage Stock Level (quantity)</span>
          </div>
          <div className="flex items-center justify-between">
            <label>Stock Status</label>
            <select className="select select-sm w-[80%]" id="">
              <option value="In Stock">In Stock</option>
              <option value="In Stock">Out of Stock</option>
            </select>
          </div>
          <div className="flex items-center justify-start gap-14">
            <label>Sold Individually?</label>
            <input
              className="checkbox checkbox-info checkbox-sm "
              type="checkbox"
              name=""
              id=""
            />
            <span>Limit purchases to 1 item per order</span>
          </div>
          <div className="flex items-center justify-between">
            <label>Product Code</label>
            <input
              className="input input-sm w-[80%]"
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="flex items-center justify-between">
            <label>Low Stock Warning</label>
            <input
              className="input input-sm w-[80%]"
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="flex items-center justify-start gap-16 ">
            <label>Show Stock Quantity?</label>
            <input type="checkbox" className="toggle toggle-sm" />
          </div>
          <div className="flex items-center justify-start gap-16">
            <label>Show Stock With Text</label>
            <input type="checkbox" className="toggle toggle-sm" />
          </div>
          <div className="flex items-center justify-start">
            <label>Hide Stock</label>
            <input type="checkbox" className="toggle toggle-sm ml-36" />
          </div>
        </div>
      ),
    },
    {
      label: "Price",
      content: (
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label>Regular Price</label>
            <select className="select select-sm w-[80%]">
              <option value="In Stock">Regular</option>
              <option value="In Stock">Irregular</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <label>Selling Price</label>
            <input className="input input-sm w-[80%]" type="text" />
          </div>
          <div className="flex items-center justify-between">
            <label>Discount</label>
            <select className="select select-sm w-[80%]" id="">
              <option value="In Stock">10%</option>
              <option value="In Stock">20%</option>
              <option value="In Stock">30%</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      label: "Attribute",
      content: (
        <div className="w-full flex gap-4">
          <select className="select select-sm w-full">
            <option value="Custom Product Attribute">
              Custom Product Attribute{" "}
            </option>
            <option value="size">Size </option>
            <option value="color">Color </option>
          </select>

          <button className="btn btn-sm btn-outline">
            <AiOutlinePlus />{" "}
          </button>
        </div>
      ),
    },
    {
      label: "Shipping Info",
      content: (
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label>Weight (kg)</label>
            <input
              placeholder="0"
              className="input input-sm w-[80%]"
              type="text"
              name=""
              id=""
            />
          </div>

          <div className="flex items-center justify-between">
            <label>Dimensions (cm)</label>
            <div className="flex gap-2 w-full ml-20">
              <input
                placeholder="Length"
                className="input input-sm w-1/3"
                type="text"
                name=""
                id=""
              />
              <input
                placeholder="Width"
                className="input input-sm w-1/3"
                type="text"
                name=""
                id=""
              />
              <input
                placeholder="Height"
                className="input input-sm w-1/3"
                type="text"
                name=""
                id=""
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label>Shipping Class</label>
            <select className="select select-sm w-[80%]" id="">
              <option value="No Shipping Class">No Shipping Class</option>
              <option value="In Stock">Class One</option>
              <option value="In Stock">Class Two</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      label: "Video",
      content: (
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label>Video Provider</label>
            <select className="select select-sm w-[80%]" id="">
              <option value="Select Provider">Select Provider</option>
              <option value="In Stock">Provider One</option>
              <option value="In Stock">Provider Two</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <label>Video Link</label>
            <input
              className="input input-sm w-[80%]"
              placeholder="Video Link"
              type="text"
              name=""
              id=""
            />
          </div>
          <span className="text-sm text-gray-400">
            User proper link without extra parameter. Dont use short share
            link/embedded iframe code
          </span>
        </div>
      ),
    },
    {
      label: "Shipping configuration",
      content: (
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label>Estimated Shipping Time</label>
            <input
              className="input input-sm w-[80%]"
              placeholder="in days"
              type="text"
              name=""
              id=""
            />
          </div>

          <div className="flex items-center justify-start gap-16 ">
            <label>Free Shipping</label>
            <input type="checkbox" className="toggle toggle-sm" />
          </div>
          <div className="flex items-center justify-start gap-16 ">
            <label>Flat Rate</label>
            <input type="checkbox" className="toggle toggle-sm" />
          </div>
          <div className="flex items-center justify-start gap-16 ">
            <label>Quantity Multiple</label>
            <input type="checkbox" className="toggle toggle-sm" />
          </div>
          <div className="flex items-center justify-start gap-16 ">
            <label>Cash on Deleivery</label>
            <input type="checkbox" className="toggle toggle-sm" />
          </div>
        </div>
      ),
    },
    {
      label: "Offer",
      content: (
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center justify-start gap-16 ">
            <label>Flash Deal</label>
            <input type="checkbox" className="toggle toggle-sm" />
          </div>
          <div className="flex items-center justify-start gap-16 ">
            <label>Today's Deal</label>
            <input type="checkbox" className="toggle toggle-sm" />
          </div>
          <div className="flex items-center justify-start gap-16 ">
            <label>Features</label>
            <input type="checkbox" className="toggle toggle-sm" />
          </div>
        </div>
      ),
    },
  ];

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
                <Tabs tabs={tabs} />
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
