import React from "react";

const LazyImage = ({ src, alt, w = "w-52  h-52" }) => (
  <img
    className={`${w}`}
    src={src}
    alt={alt}
    loading="lazy"
    onError={(e) => {
      e.target.src = "/no-image.svg";
    }}
  />
);

export default LazyImage;
