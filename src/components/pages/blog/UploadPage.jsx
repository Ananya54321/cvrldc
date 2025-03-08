"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

const UploadPage = ({ onUpload }) => {
  const [resource, setResource] = useState();

  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
      onSuccess={(result, { widget }) => {
        const imageUrl = result?.info?.secure_url; 
        setResource(imageUrl);
        if (onUpload) {
          onUpload(imageUrl); 
        }
      }}
      onQueuesEnd={(result, { widget }) => {
        widget.close();
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          setResource(undefined);
          open();
        }
        return <button onClick={handleOnClick}>Upload an Image</button>;
      }}
    </CldUploadWidget>
  );
};

export default UploadPage;
