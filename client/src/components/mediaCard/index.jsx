import React, { useState } from "react";
import Card from "../Card";
import CopyToClipboard from "react-copy-to-clipboard";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineLink } from "react-icons/ai";

const MediaCard = ({ link }) => {
  const [copied, setCopied] = useState();
  return (
    <div className="w-full">
      <Card>
        <div className="flex items-center justify-between w-full">
          <img src={link} className="object-contain w-48 h-48" alt="" />
          <CopyToClipboard text={link} onCopy={() => setCopied(true)}>
            <span>{copied ? <AiOutlineCheck /> : <AiOutlineLink />}</span>
          </CopyToClipboard>
        </div>{" "}
      </Card>
    </div>
  );
};

export default MediaCard;
