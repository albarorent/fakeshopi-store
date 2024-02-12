import React, { useState } from "react";

const LazyImage = ({ src, alt, w = "w-52  h-52" }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error ? (
        <img
          className={`${w}`}
          src="/no-image.svg"
          alt={alt}
          width="206px"
          height="206px"
        />
      ) : (
        <picture>
          <source srcSet={src} type="image/webp" />
          <source srcSet={src} type="image/jpg" />
          <img
            className={`${w}`}
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
            width="206px"
            height="206px"
          />
        </picture>
      )}
    </div>
  );
};

export default LazyImage;
