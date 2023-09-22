import PropTypes from "prop-types";
import { AiOutlineCalendar, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";

// other props can be filled when necessary
const BlogsCard = ({
  blogImage,
  date,
  views,
  heading,
  paragraph,
  buttonHandler,
}) => {
  return (
    <Link
      to={PATHS.blogs}
      className="overflow-hidden shadow transition hover:shadow-lg md:mt-16 mt-8 cursor-pointer col-span-4 md:col-span-1 p-4 border rounded-xl"
    >
      <img
        alt="Office"
        src={blogImage}
        className="h-56 w-full object-cover rounded-xl"
      />
      <div className="bg-white  p-4 sm:p-6">
        <div className="flex gap-4">
          <time
            dateTime="2022-10-10"
            className="flex items-center gap-2 text-xs text-gray-500"
          >
            <AiOutlineCalendar className="text-xl" /> 10th Oct 2022
          </time>

          <div className="flex gap-2 text-sm items-center">
            <AiOutlineEye /> Views
          </div>
        </div>

        <a href="#">
          <h3 className="mt-0.5 text-lg text-gray-900">
            How to position your furniture for positivity
          </h3>
        </a>

        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
          dolores, possimus pariatur animi temporibus nesciunt praesentium
          dolore sed nulla ipsum eveniet corporis quidem, mollitia itaque minus
          soluta, voluptates neque explicabo tempora nisi culpa eius atque
          dignissimos. Molestias explicabo corporis voluptatem?
        </p>
      </div>
    </Link>
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
