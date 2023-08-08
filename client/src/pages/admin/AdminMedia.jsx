import React, { useState } from "react";
import { Card, Header } from "../../components";
import { useSelector } from "react-redux";
import API_WRAPPER from "../../api";

const AdminMedia = () => {
  const [media, setMedia] = useState();

  const darkMode = useSelector((x) => x.appConfig.darkMode);

  const addFiles = async () => {
    const mediaData = new FormData();
    for (let elem of media) {
      mediaData.append("media", elem);
    }
    API_WRAPPER.post("/media", mediaData);
  };
  return (
    <div className="m-5">
      <Header heading="Media route to upload media files" />
      <Card>
        <div className="p-5">
          <button
            className="btn btn-primary"
            onClick={() => {
              window.add_media_modal.showModal();
            }}
          >
            Add media Files{" "}
          </button>
        </div>
      </Card>
      <dialog id="add_media_modal">
        <div
          className={` ${
            darkMode ? "bg-cardDarker" : "bg-cardLight"
          } shadow-xl rounded-xl h-full  flex flex-col p-10`}
        >
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Pick media Files</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              multiple
              onChange={(e) => {
                setMedia(e.target.files);
              }}
              accept=".jpeg,.png"
            />
          </div>
          <div className="shadow-lg p-5 flex gap-5 rounded-md self-end">
            <button className="btn btn-accent" onClick={addFiles}>
              Add
            </button>
            <button
              className="btn btn-accent"
              onClick={() => {
                window.add_media_modal.close();
              }}
            >
              close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AdminMedia;
