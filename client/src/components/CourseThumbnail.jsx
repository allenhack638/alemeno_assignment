import React, { useState, useEffect } from "react";
import SkeletonLoader from "./SkeletonLoader.jsx";

const CourseThumbnail = ({ thumbnail, altText, fullWidth = false }) => {
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(null);

  // Set the image source after the component has mounted
  useEffect(() => {
    setImageSrc(thumbnail);
  }, [thumbnail]);

  return (
    <div className="flex gap-2 w-full items-center">
      <figure
        className={`relative ${
          fullWidth ? "w-full" : "w-full sm:w-auto"
        } h-40 sm:h-48 lg:h-64`}
      >
        {loading && <SkeletonLoader />}
        <img
          src={imageSrc}
          alt={altText}
          className={`h-40 sm:h-48 lg:h-64 ${
            fullWidth ? "w-full" : "w-full sm:w-auto lg:w-96"
          } object-cover rounded-md ${loading ? "hidden" : ""}`}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </figure>
    </div>
  );
};

export default CourseThumbnail;
