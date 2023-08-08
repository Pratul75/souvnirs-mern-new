import { useState } from "react";
import { Tab } from "@headlessui/react";
import ProductCardMini from "../cards/ProductCardMini";
import GiftOne from "../../../assets/shop/cardImages/giftOne.png";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductTabs = () => {
  let [categories] = useState({
    Recent: [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        price: 400,
        image: GiftOne,
        rating: 5,

        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        price: 400,
        image: GiftOne,
        rating: 3,
        shareCount: 2,
      },
    ],
    Popular: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        price: 400,
        image: GiftOne,
        rating: 2,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        price: 400,
        image: GiftOne,
        rating: 4,
        shareCount: 12,
      },
    ],
    Trending: [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        price: 400,
        image: GiftOne,
        rating: 2,
        shareCount: 5,
      },
      {
        d: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        price: 400,
        image: GiftOne,
        rating: 2,
        shareCount: 5,
      },
    ],
  });

  return (
    <div className="col-span-2 w-full">
      <Tab.Group>
        <Tab.List className="flex  rounded-xl  p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-themeColor"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl bg-white p-3",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              <ul className="flex">
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="rounded-md p-3 hover:bg-gray-100"
                  >
                    <ProductCardMini
                      id={post.id}
                      title={post.title}
                      image={post.image}
                      price={post.price}
                      rating={post.rating}
                      key={post.id}
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ProductTabs;
