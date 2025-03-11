import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const UploadPage = ({ onUpload, existingImages = [] }) => {
  const [resources, setResources] = useState(existingImages);
  const MAX_IMAGES = 10; // Maximum number of images allowed

  return (
    <div>
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
        multiple
        onSuccess={(result) => {
          const imageUrl = result?.info?.secure_url;
          if (imageUrl && resources.length < MAX_IMAGES) {
            // Check if image already exists to prevent duplication
            if (!resources.includes(imageUrl)) {
              setResources((prevResources) => {
                const newResources = [...prevResources, imageUrl];
                // Only pass the new image to the parent component
                if (onUpload) {
                  onUpload([imageUrl]);
                }
                return newResources;
              });
            }
          }
        }}>
        {({ open }) => {
          function handleOnClick() {
            // Prevent opening if max images reached
            if (resources.length >= MAX_IMAGES) {
              alert(`Maximum of ${MAX_IMAGES} images allowed`);
              return;
            }
            open();
          }
          return (
            <div>
              <button
                type="button"
                onClick={handleOnClick}
                className="bg-gray-200 px-4 py-2 rounded text-sm"
                disabled={resources.length >= MAX_IMAGES}>
                Upload Images ({resources.length}/{MAX_IMAGES})
              </button>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {resources.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Uploaded ${index}`}
                      className="w-32 h-32 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newResources = resources.filter(
                          (_, i) => i !== index
                        );
                        setResources(newResources);
                        // Inform parent component about removal
                        if (onUpload) {
                          onUpload(newResources, true);
                        }
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default UploadPage;
