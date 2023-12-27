import { Card, Header } from "../../../components";
import { MediaCard } from "../../../components";
import { nanoid } from "nanoid";
// import Loading from "../../common/loading";
import useAdminMedia from "./useAdminMedia";
import {
  BiFirstPage,
  BiLastPage,
  BiLeftArrowAlt,
  BiRightArrowAlt,
} from "react-icons/bi";
import { ToastContainer } from "react-toastify";
const AdminMedia = () => {
  const {
    addFiles,
    baseUrl,
    loading,
    medias,
    setMedia,
    userRole,
    setPage,
    page,
    totalPagesShow,
    setPageSize,
    pageSize,
    deletMedia,
  } = useAdminMedia();

  const handlePageChange = (num) => {
    setPage(num);
  };

  const handlePageSizeChange = (event) => {
    const eventSize = Number(event.target.value);
    setPage(1);
    setPageSize(eventSize);
  };

  return (
    <div className="m-5">
      <Header heading="Media route to upload media files" />
      <Card>
        <div className="p-5 w-full">
          <button
            className="btn btn-primary mb-3"
            onClick={() => {
              window.add_media_modal.showModal();
            }}
          >
            Add media Files{" "}
          </button>
          <div className="grid grid-cols-5 gap-3">
            {userRole === "vendor" &&
              medias &&
              medias?.map((a, index) => {
                return (
                  <MediaCard
                    index={index}
                    key={nanoid()}
                    deletMedia={deletMedia}
                    id={a?._id}
                    url={
                      !a?.links?.includes("res.cloudinary") &&
                      !a?.links?.includes("cdn.shopify")
                        ? a?.links
                        : a
                    }
                    link={
                      !a?.links?.includes("res.cloudinary") &&
                      !a?.links?.includes("cdn.shopify")
                        ? `${baseUrl}/${a?.links}`
                        : a
                    }
                  />
                );
              })}
            {userRole == "admin" &&
              medias?.map((a, index) =>
                a.links ? ( // Check if the 'links' property is available
                  <MediaCard
                    key={nanoid()}
                    index={index}
                    id={a?._id}
                    deletMedia={deletMedia}
                    url={a?.links}
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
                ) : null
              )}
          </div>
          <div className="flex gap-1 justify-between w-full items-center mt-4 bg-base-300 rounded-xl p-4">
            <div>
              <label>Page Size</label>
              <select
                value={pageSize}
                // disabled={page > totalPagesShow - 10}
                onChange={handlePageSizeChange}
                className=" select select-sm select-primary input-bordered mx-2"
              >
                {[5, 10, 25, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                onClick={() => handlePageChange(1)}
                disabled={page === 1}
                className="btn btn-square btn-sm btn-primary"
              >
                <BiFirstPage className="text-xl" />
              </button>
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="btn btn-square btn-sm btn-primary mx-2"
              >
                <BiLeftArrowAlt className="text-xl" />
              </button>
              <span className="text-lg">
                Page{" "}
                <strong>
                  {page} of {totalPagesShow}
                </strong>{" "}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPagesShow}
                className="btn btn-square btn-sm btn-primary mx-2"
              >
                <BiRightArrowAlt className="text-xl" />
              </button>
              <button
                onClick={() => handlePageChange(totalPagesShow)}
                disabled={page === totalPagesShow}
                className="btn btn-square btn-primary btn-sm"
              >
                <BiLastPage className="text-xl" />
              </button>
              {/* Select for page size */}
            </div>
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
                setMedia(selectedFiles);
              }}
              accept=".png,.jpg"
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
      {/* {loading && <It />} */}
      <dialog id="product_management_Media_success" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Changes submitted</h3>
          <p className="py-4">Thanks for submitting your changes.</p>
          <div className="modal-action">
            {/* <button onClick={deleteSelectedRow} className="btn btn-error">
              Delete
            </button> */}
            <button className="btn">Done</button>
          </div>
        </form>
      </dialog>
      <ToastContainer />
    </div>
  );
};

export default AdminMedia;
