import { Dropzone, Header } from "../../components";
import CollectionBannerImg from "../../assets/images/collectionBannerImg.png";
import ReactQuill from "react-quill";
const Collection = () => {
  return (
    <div>
      <Header
        heading="Collections"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
        image={CollectionBannerImg}
      />

      <div className="mt-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-white px-4 py-8 rounded-xl shadow-lg">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Collection Title</span>
              </label>
              <input className="input input-accent" type="text" name="" id="" />
            </div>
          </div>

          <div className="col-span-1  bg-white px-4 py-8 rounded-xl shadow-lg">
            <div className="form-control">
              <label htmlFor="publishing-select" className="label">
                <span className="label-text">Publishing</span>
              </label>
              <select className="select select-accent" id="publishing-select">
                <option value="onlineStore">Online Store</option>
                <option value="offlineStore">Ofline Store</option>
              </select>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="bg-themeColor btn rounded-full text-white">
                Publish
              </button>
              <button className="bg-[#5B6B79] btn rounded-full text-white">
                Cancel
              </button>
            </div>
          </div>
          <div className="col-span-2 bg-white px-4 py-8 rounded-xl shadow-lg">
            <h1>Description</h1>

            <div className="mt-4">
              <ReactQuill className="h-[200px]" />
            </div>
          </div>
          <div className="col-span-1 bg-white px-4 py-8 rounded-xl shadow-lg">
            <h1>Product Organisation</h1>
            <hr className="mt-4" />
            <div className="form-control">
              <label htmlFor="productCategorySelect" className="label">
                <span className="label-text">Product category</span>
              </label>
              <select
                className="select select-accent"
                id="productCategorySelect"
              >
                <option value="BMW">BMW</option>
                <option value="Mercedes">Mercedes</option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="productCategorySelect" className="label">
                <span className="label-text">Vendor</span>
              </label>
              <select
                className="select select-accent"
                id="productCategorySelect"
              >
                <option value="vendor-1">Vendor 1</option>
                <option value="vendor-2">Vendor 2</option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="productCategorySelect" className="label">
                <span className="label-text">Tags</span>
              </label>
              <input className="input input-accent" type="text" name="" id="" />
            </div>
          </div>

          <div className="col-span-2  bg-white px-4 py-8 rounded-xl shadow-lg">
            <h1>Collections</h1>
            <div className="form-control flex-row items-center ">
              <label className="label">
                <span className="label-text">Product must match:</span>
              </label>
              <div className="flex items-center gap-4">
                <label className="label">
                  <span className="label-text">all conditions</span>
                </label>
                <input
                  className="radio radio-accent"
                  type="radio"
                  name=""
                  id=""
                />
                <label className="label">
                  <span className="label-text">any conditions</span>
                </label>
                <input
                  className="radio radio-accent"
                  type="radio"
                  name=""
                  id=""
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <select
                  placeholder="Price"
                  className="select select-accent w-full"
                >
                  <option value="price-1">Price 1</option>
                  <option value="price-2">Price 2</option>
                </select>
              </div>
              <div>
                <select
                  placeholder="Is greater than"
                  className="select select-accent w-full"
                >
                  <option value="greater-than-1">greater than 1</option>
                  <option value="greater-than-2">greater than 2</option>
                </select>
              </div>
              <div>
                <input
                  className="input input-accent w-full"
                  type="text"
                  name=""
                  id=""
                  placeholder="Rs"
                />
              </div>
            </div>
            <div>
              <p className="text-[#A4A4A4] mt-4">
                *This collection will include all products with at least one
                variant that matches Price
              </p>
            </div>
            <div className="mt-4">
              <button className="bg-themeColor font-thin rounded-[8px] btn text-white ">
                Add Another Collection
              </button>
            </div>
          </div>
          <div className="col-span-1  bg-white px-4 py-8 rounded-xl shadow-lg">
            <h1>Image</h1>
            <div className="border-[1px] border-dashed border-accent  rounded-xl mt-4">
              <Dropzone />
            </div>
          </div>
          <div className="col-span-3 bg-white px-4 py-8 rounded-xl shadow-lg">
            <h1>SEO</h1>
            <hr className="mt-4" />
            <div className="form-control">
              <label className="label">
                <span className="label-text">Meta Title</span>
              </label>
              <input
                placeholder="Meta Title"
                className="input input-accent"
                type="text"
                name=""
                id=""
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Meta Description</span>
              </label>
              <input
                placeholder="Meta Description"
                className="input input-accent"
                type="text"
                name=""
                id=""
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Focus Keywords</span>
              </label>
              <input
                placeholder="Focus Keywords"
                className="input input-accent"
                type="text"
                name=""
                id=""
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Slug</span>
              </label>
              <input
                placeholder="Slug"
                className="input input-accent"
                type="text"
                name=""
                id=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
