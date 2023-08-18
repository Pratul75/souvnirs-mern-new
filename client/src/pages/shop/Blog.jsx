import Banner from "./Banner";
import ShopBanner from "../../assets/shop/bannerImages/shopBanner.png";

const Blog = ({}) => {
  return (
    <div>
      <Banner text={"Blog"} navigation={"Home/Blog"} bannerImage={ShopBanner} />
    </div>
  );
};

export default Blog;
