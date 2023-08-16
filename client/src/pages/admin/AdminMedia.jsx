import React, { useEffect, useState } from "react";
import { Card, Header } from "../../components";
import { useSelector } from "react-redux";
import API_WRAPPER from "../../api";
import MediaCard from "../../components/mediaCard";
import { decodeToken } from "react-jwt";
import { nanoid } from "nanoid";

const AdminMedia = () => {
  const [media, setMedia] = useState();
  const [medias, setMedias] = useState();
  const [ref, setRef] = useState(false);
  const [userRole, setRole] = useState("");

  const token = localStorage.getItem("token");

  const darkMode = useSelector((x) => x.appConfig.darkMode);
  const fetchMedias = async (req, res) => {
    const resp = await API_WRAPPER.get("/media");
    console.log("AdminMedia.jsx", resp);
    setMedias(resp.data);
  };
  console.log("AdminMedia.jsx", userRole);

  const addFiles = async () => {
    const mediaData = new FormData();
    for (let elem of media) {
      mediaData.append("media", elem);
    }
    const response = await API_WRAPPER.post("/media", mediaData);
    if (response.status === 200) {
      window.add_media_modal.close();
      setRef((a) => !a);
    }
  };
  useEffect(() => {
    const { role } = decodeToken(token);
    setRole(role); // Set the userRole here

    fetchMedias();
  }, [token, ref]);
  return (
    <div className="m-5">
      <Header heading="Media route to upload media files" />
      <Card>
        <div className="p-5 w-full">
          <button
            className="btn btn-primary"
            onClick={() => {
              window.add_media_modal.showModal();
            }}
          >
            Add media Files{" "}
          </button>
          <div className="flex flex-col gap-5">
            {userRole === "vendor" &&
              medias?.links?.map((a) => {
                console.log(a);
                return <MediaCard key={nanoid()} link={a} />;
              })}
            {userRole == "admin" &&
              medias?.map((a) => (
                <MediaCard
                  key={nanoid()}
                  link={a.links}
                  vendorName={
                    a.vendorId
                      ? `${a.vendorId.firstName} ${a.vendorId.lastName}`
                      : "admin"
                  }
                />
              ))}
          </div>
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
              accept=".jpeg,.png,.jpg"
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
