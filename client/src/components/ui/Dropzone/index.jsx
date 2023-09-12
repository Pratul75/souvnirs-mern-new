import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { BsUpload } from "react-icons/bs";

const Dropzone = ({ onFilesChange }) => {
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const nonPngFiles = acceptedFiles.filter(
        (file) => !file.type.startsWith("image/png")
      );

      if (nonPngFiles.length > 0) {
        // Show the modal when non-PNG files are added
        setShowModal(true);
      } else {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
        onFilesChange([...files, ...acceptedFiles]);
      }
    },
    [files, onFilesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/png",
  });

  return (
    <div className="h-[30vh]" {...getRootProps()}>
      <input accept="image/png" {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image files here ...</p>
      ) : (
        <div className="flex flex-1 items-center justify-center flex-col h-full">
          <div className="flex justify-center items-center flex-col">
            <p className="p-4 text-center">
              Drag & drop some image files here, or click to select image files
            </p>
            <div className="bg-base-200 p-4 rounded-xl">
              <BsUpload size={40} />
            </div>
          </div>
        </div>
      )}
      {/* Modal to inform the user */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Only PNG files are allowed. Please remove non-PNG files.</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
