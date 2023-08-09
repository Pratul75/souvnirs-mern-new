import BlogsCard from "../cards/BlogsCard"; // Make sure the path is correct
import PropTypes from "prop-types";

const BlogList = ({ blogItemsData }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mx-16">
      {blogItemsData?.map(
        ({ id, blogImage, date, views, heading, paragraph, buttonHandler }) => {
          return (
            <BlogsCard
              key={id}
              blogImage={blogImage}
              buttonHandler={buttonHandler}
              date={date}
              views={views}
              heading={heading}
              paragraph={paragraph}
            />
          );
        }
      )}
    </div>
  );
};

BlogList.propTypes = {
  blogItemsData: PropTypes.arrayOf(
    PropTypes.shape({
      blogImage: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      views: PropTypes.number.isRequired,
      heading: PropTypes.string.isRequired,
      paragraph: PropTypes.string.isRequired,
      buttonHandler: PropTypes.func.isRequired,
    })
  ).isRequired,
};

export default BlogList;
