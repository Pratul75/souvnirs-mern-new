import { useState } from "react";
import Card from "../Card";
import CopyToClipboard from "react-copy-to-clipboard";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineLink } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import { debouncedShowToast } from "../../../utils";
import PropTypes from "prop-types";
import { DeleteBtnSvg } from "../../../icons/tableIcons";
const MediaCard = ({ link, vendorName, index, deletMedia, url, id }) => {
  const [selectedImage, setSelectedImage] = useState();
  console.log(",,,,<<<<", link);
  const [copied, setCopied] = useState();
  const copyHandler = () => {
    setCopied(true);
    debouncedShowToast("Link Copied To Clipboard", "success");
  };
  return (
    <div
      key={index}
      className="relative group cursor-pointer rounded-lg h-80"
      onMouseEnter={() => setSelectedImage(index)}
      onMouseLeave={() => setSelectedImage(null)}
      // onClick={() => handleImageClick(link)}
    >
      <img
        src={link}
        // alt={image.name}
        className="rounded-xl w-full h-full shadow-md"
      />
      {selectedImage === index && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-center">
          <div className="w-40 justify-around">
            <div>{vendorName}</div>
            <div className="flex justify-around ml-11 mt-3">
              <div
                style={{
                  width: "30px",
                  border: "1px solid red",
                  padding: "5px",
                  borderRadius: "3px",
                }}
                onClick={() => deletMedia(url, id)}
              >
                <DeleteBtnSvg />
              </div>
              <CopyToClipboard text={link} onCopy={copyHandler}>
                <span className="text-2xl mr-10">
                  {copied ? <AiOutlineCheck /> : <AiOutlineLink />}
                </span>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      )}
    </div>
    // <div className="w-full">
    //   <Card>
    //     <div className="flex bg-base-200 h-60 rounded-xl items-center justify-between w-full p-4">
    //       <img src={link} className="rounded-xl w-40 " alt="" />
    //       {vendorName && <div>Vendor:{" " + vendorName}</div>}
    //       <div>
    //         Type:
    //         {" " +
    //           String(link.match(/\.[0-9a-z]+$/i))
    //             .substring(1)
    //             .toUpperCase()}
    //       </div>
    // <CopyToClipboard text={link} onCopy={copyHandler}>
    //   <span className="text-2xl mr-10">
    //     {copied ? <AiOutlineCheck /> : <AiOutlineLink />}
    //   </span>
    // </CopyToClipboard>
    //     </div>{" "}
    //   </Card>
    //   <ToastContainer />
    // </div>
  );
};

MediaCard.propTypes = {
  link: PropTypes.string.isRequired,
  vendorName: PropTypes.string, // Make sure to adjust the type if needed
};
export default MediaCard;

/*
 <div className="flex w-40 justify-around">
            <p>Type: {image.type}</p>
            <p>Name: {image.name}</p> 
            <div
              style={{ width: "30px", border: "1px solid red", padding: "5px" }}
            >
              <DeleteBtnSvg />
            </div>
            <CopyToClipboard text={link} onCopy={copyHandler}>
              <span className="text-2xl mr-10">
                {copied ? <AiOutlineCheck /> : <AiOutlineLink />}
              </span>
            </CopyToClipboard>
          </div>*/
