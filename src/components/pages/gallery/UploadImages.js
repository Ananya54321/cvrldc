import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

const UploadPage = ({ onUpload }) => {
  const [resources, setResources] = useState([]); // Store multiple images

  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
      multiple
      onSuccess={(result) => {
        const imageUrl = result?.info?.secure_url;
        if (imageUrl) {
          setResources((prevResources) => {
            const updatedImages = [...prevResources, imageUrl]; // Correctly update state
            if (onUpload) {
              onUpload(updatedImages);
            }
            return updatedImages;
          });
        }
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          open(); // Opens upload widget
        }
        return (
          <div>
            <button
              type="button"
              onClick={handleOnClick}
              className="bg-gray-200 px-4 py-2 rounded text-sm"
            >
              Upload Images
            </button>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {resources.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Uploaded ${index}`}
                  className="w-32 h-32 object-cover rounded"
                />
              ))}
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadPage;
