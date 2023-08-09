import PropTypes from "prop-types";
import { IoCalendarOutline } from "react-icons/io5";
import { AiOutlineEye } from "react-icons/ai";

const BlogsCard = ({
  blogImage,
  date,
  views,
  heading,
  paragraph,
  buttonHandler,
}) => {
  return (
    <div className="col-span-3 md:col-span-1 rounded-xl border-[1px] border-gray-300 p-4">
      <div className="flex flex-col ">
        <div className="p-4 flex justify-center bg-teal-100 rounded-xl">
          <img
            style={{ mixBlendMode: "multiply" }}
            className="object-cover"
            src={blogImage}
            alt=""
          />
        </div>
        <div className="flex gap-4 py-4">
          <div className="flex items-center gap-4">
            <IoCalendarOutline className="text-primary" />
            {date}
          </div>
          <div className="flex items-center gap-4">
            <AiOutlineEye className="text-primary" />
            {views}
          </div>
        </div>
        <div>
          <h1 className="text-2xl">{heading}</h1>
          <p className="line-clamp-2">{paragraph}</p>
          <button onClick={buttonHandler} className="btn btn-ghost">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

BlogsCard.propTypes = {
  blogImage: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  views: PropTypes.number.isRequired,
  heading: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  buttonHandler: PropTypes.func.isRequired,
};

export default BlogsCard;
