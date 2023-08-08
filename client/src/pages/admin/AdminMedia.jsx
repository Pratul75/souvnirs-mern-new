import React from "react";
import { Card, Header } from "../../components";

const AdminMedia = () => {
  return (
    <div>
      <Header heading="Media route to upload media files" />
      <Card>
        <button
          onClick={() => {
            window.add_media_modal.showModal();
          }}
        >
          Add media Files{" "}
        </button>
      </Card>
      <dialog id="add_media_modal">
        <Card>
          <div className="shadow-lg">
            <button
              a
              onClick={() => {
                window.add_media_modal.close();
              }}
            >
              close
            </button>
          </div>
        </Card>
      </dialog>
    </div>
  );
};

export default AdminMedia;
