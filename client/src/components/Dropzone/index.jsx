import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p className="p-4 flex items-center justify-center">
          Drag 'n' drop some files here, or click to select files
        </p>
      )}
    </div>
  );
};

export default Dropzone;
