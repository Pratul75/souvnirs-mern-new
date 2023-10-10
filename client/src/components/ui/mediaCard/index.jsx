import { useState } from "react";
import Card from "../Card";
import CopyToClipboard from "react-copy-to-clipboard";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineLink } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import { debouncedShowToast } from "../../../utils";
import PropTypes from "prop-types";
const MediaCard = ({ link, vendorName }) => {
  const [copied, setCopied] = useState();
  const copyHandler = () => {
    setCopied(true);
    debouncedShowToast("Link Copied To Clipboard", "success");
  };
  return (
    <div className="w-full">
      <Card>
        <div className="flex bg-base-200 rounded-xl items-center justify-between w-full p-4">
          <img src={link} className="rounded-xl w-48" alt="" />
          {vendorName && <div>Vendor:{" " + vendorName}</div>}
          {vendorName && (
            <div>
              Type:
              {" " +
                String(
                  link.match(/\.[0-9a-z]+$/i)[0].substring(1)
                ).toUpperCase()}
            </div>
          )}
          <CopyToClipboard text={link} onCopy={copyHandler}>
            <span className="text-2xl mr-10">
              {copied ? <AiOutlineCheck /> : <AiOutlineLink />}
            </span>
          </CopyToClipboard>
        </div>{" "}
      </Card>
      <ToastContainer />
    </div>
  );
};

MediaCard.propTypes = {
  link: PropTypes.string.isRequired,
  vendorName: PropTypes.string, // Make sure to adjust the type if needed
};
export default MediaCard;
