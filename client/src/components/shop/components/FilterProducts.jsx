import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useState } from "react";
import FilterCard from "./FilterCard";
import ProductCardMini from "../cards/ProductCardMini";
import { nanoid } from "nanoid";
import GiftOneImage from "../../../assets/shop/cardImages/giftOne.png";
import ProductCard from "../cards/ProductCard";
const FilterProducts = () => {
  const [filterType, setFilterType] = useState(false);
  const [shippingStates, setShippingStates] = useState({
    freeShipping: false,
    readyToShip: false,
  });


    const getWishlist = async () => {
      try {
        const getdata = await API.get("/wishlist/getmywishlist");
        setWishList(getdata?.data?.data?.wishlist);
        console.log(
          "-----___---___--===_-===__==+_+_-==-__=>",
          getdata?.data?.data
        );
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getWishlist();
    }, []);

  return (
    <div className="mx-16 mt-4">
      <div className="grid grid-cols-4">
        <div className="col-span-1">
          <div className="flex gap-4 flex-col">
            <FilterCard
              title="Product Filter"
              heading="Filter By Size"
              filters={[
                {
                  filterName: "Pratul",
                  productAmount: 62,
                },
                {
                  filterName: "Small",
                  productAmount: 15,
                },
                {
                  filterName: "Medium",
                  productAmount: 10,
                },
                {
                  filterName: "Large",
                  productAmount: 32,
                },
              ]}
            />
            <FilterCard
              title="Category"
              heading="Filter By Size"
              filters={[
                {
                  filterName: "Fashion",
                  productAmount: 62,
                },
                {
                  filterName: "Jewellery",
                  productAmount: 155,
                },
                {
                  filterName: "Accessories",
                  productAmount: 10,
                },
                {
                  filterName: "BottomWear",
                  productAmount: 32,
                },
              ]}
            />
            <FilterCard
              title="Shipping Speed"
              filters={[
                {
                  filterName: "Make to order",
                  productAmount: 30,
                },
                {
                  filterName: "Ready To ship",
                  productAmount: 10,
                },
              ]}
            />
            <FilterCard
              title="Values"
              filters={[
                {
                  filterName: "Artisanal",
                  productAmount: 62,
                },
                {
                  filterName: "Ready To ship",
                  productAmount: 155,
                },
              ]}
            />
          </div>
        </div>
        <div className="col-span-3 container px-8">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <button
                onClick={() => setFilterType((prevState) => !prevState)}
                className={`btn ${filterType && "btn-primary"} btn-square`}
              >
                <MdOutlineDashboard className="text-2xl" />
              </button>
              <button
                onClick={() => setFilterType((prevState) => !prevState)}
                className={`btn ${!filterType && "btn-primary"} btn-square`}
              >
                <AiOutlineUnorderedList className="text-2xl" />
              </button>
              <select
                className="select select-primary"
                name="defaultSorting"
                id="defaultSorting"
              >
                <option selected disabled>
                  Default Sorting
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
            <div className="flex gap-4">
              <div className="form-control flex flex-row items-center gap-2">
                <label className="label">
                  <span className="label-text">Ready To Ship</span>
                </label>
                <input
                  onChange={() =>
                    setShippingStates((prevState) => {
                      return {
                        ...prevState,
                        readyToShip: !shippingStates.readyToShip,
                      };
                    })
                  }
                  checked={shippingStates.readyToShip}
                  className="toggle toggle-primary"
                  type="checkbox"
                  name="readyToShip"
                  id="readyToShip"
                />
              </div>
              <div className="form-control flex flex-row items-center gap-2">
                <label className="label">
                  <span className="label-text">Free Shipping</span>
                </label>
                <input
                  onChange={() =>
                    setShippingStates((prevState) => {
                      return {
                        ...prevState,
                        freeShipping: !shippingStates.freeShipping,
                      };
                    })
                  }
                  checked={shippingStates.freeShipping}
                  className="toggle toggle-primary"
                  type="checkbox"
                  name="readyToShip"
                  id="readyToShip"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-4 mt-4 flex-wrap">
            {filterType ? (
              <>
                <ProductCardMini
                  showBorder
                  id={nanoid()}
                  price={300}
                  rating={4.5}
                  title="Smart TV"
                  image={GiftOneImage}
                />
                <ProductCardMini
                  showBorder
                  id={nanoid()}
                  price={300}
                  rating={4.5}
                  title="Smart TV"
                  image={GiftOneImage}
                />
                <ProductCardMini
                  id={nanoid()}
                  price={300}
                  rating={4.5}
                  title="Smart TV"
                  image={GiftOneImage}
                />
                <ProductCardMini
                  id={nanoid()}
                  price={300}
                  rating={4.5}
                  title="Smart TV"
                  image={GiftOneImage}
                />
                <ProductCardMini
                  id={nanoid()}
                  price={300}
                  rating={4.5}
                  title="Smart TV"
                  image={GiftOneImage}
                />
                <ProductCardMini
                  id={nanoid()}
                  price={300}
                  rating={4.5}
                  title="Smart TV"
                  image={GiftOneImage}
                />
              </>
            ) : (
              <div className="flex flex-wrap gap-4 justify-center">
                <ProductCard
                  badgeColor="badge-accent"
                  badgeText="NEW"
                  price={800}
                  rating={4.2}
                  title="New Product"
                  discountPrice="300"
                  image={GiftOneImage}
                />
                <ProductCard
                  badgeColor="badge-accent"
                  badgeText="NEW"
                  price={800}
                  rating={4.2}
                  title="New Product"
                  discountPrice="300"
                  image={GiftOneImage}
                />
                <ProductCard
                  badgeColor="badge-accent"
                  badgeText="NEW"
                  price={800}
                  rating={4.2}
                  title="New Product"
                  discountPrice="300"
                  image={GiftOneImage}
                />
                <ProductCard
                  badgeColor="badge-accent"
                  badgeText="NEW"
                  price={800}
                  rating={4.2}
                  title="New Product"
                  discountPrice="300"
                  image={GiftOneImage}
                />
                <ProductCard
                  badgeColor="badge-accent"
                  badgeText="NEW"
                  price={800}
                  rating={4.2}
                  title="New Product"
                  discountPrice="300"
                  image={GiftOneImage}
                />
                <ProductCard
                  badgeColor="badge-accent"
                  badgeText="NEW"
                  price={800}
                  rating={4.2}
                  title="New Product"
                  discountPrice="300"
                  image={GiftOneImage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;
