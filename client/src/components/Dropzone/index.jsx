import { useState } from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsUpload } from "react-icons/bs";

const Dropzone = () => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const removeFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="h-[30vh]" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div className="flex flex-1 items-center justify-center flex-col h-full">
          <div className="flex justify-center items-center flex-col">
            <p className="p-4 text-center">
              Drag & drop some files here, or click to select files
            </p>
            <div className="bg-base-200 p-4 rounded-xl">
              <BsUpload size={40} />
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-1">
        {files?.map((file) => (
          <div
            key={file.name}
            className="flex items-center bg-accent rounded-xl p-4"
          >
            <p>{file.name}</p>
            <button
              className="ml-2 text-red-600 hover:text-red-800"
              onClick={() => removeFile(file.name)}
            >
              <AiOutlineCloseCircle />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropzone;
