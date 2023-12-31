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
        title: "Does drinking ",
        price: 400,
        image: GiftOne,
        rating: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've ",
        price: 400,
        image: GiftOne,
        rating: 3,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought ",
        price: 400,
        image: GiftOne,
        rating: 3,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought ",
        price: 400,
        image: GiftOne,
        rating: 3,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've",
        price: 400,
        image: GiftOne,
        rating: 3,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've ",
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
        id: 2, // Change 'd' to 'id'
        title: "Another title for the second post",
        price: 400,
        image: GiftOne,
        rating: 3,
        shareCount: 7,
      },
    ],
  });

  return (
    <div className="w-full col-span-3 hidden md:block">
      <Tab.Group>
        <Tab.List className="flex justify-center flex-wrap gap-2 md:justify-end">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className="px-2 outline-none border-b border-primary py-2"
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames("rounded-xl bg-white p-3")}
            >
              <ul className="grid grid-cols-9">
                {posts.map((post) => (
                  <li key={post.id} className="rounded-md p-3  col-span-3">
                    <ProductCardMini
                      id={post.id}
                      title={post.title}
                      image={post.image}
                      price={post.price}
                      rating={post.rating}
                    />
                    <div className="divider-horizontal"></div>
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
