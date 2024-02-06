import React from "react";

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

const LazyImage = ({ src, alt, w = "w-52  h-52" }) => (
  <picture>
    <source srcSet={isValidUrl(src) ? src : ""} type="image/webp" />
    <source srcSet={isValidUrl(src) ? src : ""} type="image/jpg" />
    <img
      className={`${w}`}
      src={src}
      alt={alt}
      aria-hidden="true"
      loading="eager"
      onError={(e) => {
        e.target.src = "/no-image.svg";
      }}
    />
  </picture>
);

export default LazyImage;
