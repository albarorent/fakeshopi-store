import React, { useState } from "react";

const LazyImage = ({ src, alt, w = "w-52  h-52" }) => {
  const [error, setError] = useState(false);

  const handleImageError = () => {
    if (!error) {
      setError(true);
    }
  };

  return (
    <picture>
    <source
      srcSet={error ? "/no-image.svg" : src}
      type="image/webp"
    />
    <source srcSet={error ? "/no-image.svg" : src} type="image/jpg" />
    <img
      className={`${w}`}
      src={error ? "/no-image.svg" : src}
      alt="alt"
      loading="lazy"
      onError={handleImageError}
      width="206px"
    />
  </picture>
  );

};

export default LazyImage;
