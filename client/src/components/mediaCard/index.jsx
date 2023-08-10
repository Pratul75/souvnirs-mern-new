import React, { useState } from "react";
import Card from "../Card";
import CopyToClipboard from "react-copy-to-clipboard";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineLink } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import { debouncedShowToast } from "../../utils";

const MediaCard = ({ link, vendorName }) => {
  const [copied, setCopied] = useState();
  const copyHandler = () => {
    setCopied(true);
    debouncedShowToast("Link Copied To Clipboard", "success");
  };
  return (
    <div className="w-full">
      <Card>
        <div className="flex items-center justify-between w-full">
          <img src={link} className="object-contain w-48 h-48" alt="" />
          {vendorName && <div>Vendor:{vendorName}</div>}
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

export default MediaCard;
