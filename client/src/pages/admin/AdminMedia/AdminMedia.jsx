import { Card, Header } from "../../../components";
import { MediaCard } from "../../../components";
import { nanoid } from "nanoid";
import Loading from "../../common/loading";
import useAdminMedia from "./useAdminMedia";
const AdminMedia = () => {
  const { addFiles, baseUrl, loading, medias, setMedia, userRole } =
    useAdminMedia();

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
                return (
                  <MediaCard
                    key={nanoid()}
                    link={
                      !a?.includes("res.cloudinary") &&
                      !a?.includes("cdn.shopify")
                        ? `${baseUrl}/${a}`
                        : a
                    }
                  />
                );
              })}
            {userRole == "admin" &&
              medias?.map((a) => (
                <MediaCard
                  key={nanoid()}
                  link={
                    !a?.links?.includes("res.cloudinary") &&
                    !a?.links?.includes("cdn.shopify")
                      ? `${baseUrl}/${a?.links}`
                      : a?.links
                  }
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
      {/* Open the modal using ID.showModal() method */}

      <dialog id="add_media_modal" className="modal">
        <div className="modal-box">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Pick media Files</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              multiple
              onChange={(e) => {
                const selectedFiles = e.target.files;
                // Check if any selected file is not a PNG
                const isInvalidFile = Array.from(selectedFiles).some(
                  (file) => !file.name.toLowerCase().endsWith(".png")
                );
                if (isInvalidFile) {
                  alert("Please select only .png files.");
                  e.target.value = null; // Clear the file input
                  setMedia(null); // Reset the media state
                } else {
                  setMedia(selectedFiles);
                }
              }}
              accept=".png,"
            />
          </div>
          <div className=" flex justify-end gap-5 mt-8">
            <button className="btn btn-primary" onClick={addFiles}>
              Add
            </button>
            <button
              className="btn"
              onClick={() => {
                window.add_media_modal.close();
              }}
            >
              close
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop"></form>
      </dialog>
      {/* <dialog id="add_media_modal">
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
      </dialog> */}
      {loading && <Loading />}
    </div>
  );
};

export default AdminMedia;
