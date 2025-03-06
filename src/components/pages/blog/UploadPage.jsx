"use client";

import { useState } from "react";
import { CldUploadButton, getCldImageUrl } from "next-cloudinary";

export default function UploadImageComponent() {
  const [publicId, setPublicId] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Handle Upload Success
  const handleUpload = (result) => {
    console.log("Upload Result:", result);

    if (result.event === "upload-added") {
      const uploadedPublicId = result.info.public_id;
      setPublicId(uploadedPublicId);

      // Generate Cloudinary URL
      const url = getCldImageUrl({
        width: 960,
        height: 600,
        src: uploadedPublicId, // Use the uploaded image's Public ID
      });

      setImageUrl(url);
      console.log(imageUrl);
    }
  };

  return (
    <div className="p-5">
      {/* Upload Button */}
      <CldUploadButton uploadPreset="LDCPage" onUploadAddedAction={handleUpload} />

      {/* Show Uploaded Image */}
      {imageUrl && (
        <div className="mt-5">
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" width={960} height={600} />
        </div>
      )}
    </div>
  );
}
