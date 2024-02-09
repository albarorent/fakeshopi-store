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
    <source srcSet={isValidUrl(src) ? src : "/no-image.svg"} type="image/webp" />
    <source srcSet={isValidUrl(src) ? src : "/no-image.svg"} type="image/jpg" />
    <img
      className={`${w}`}
      src={isValidUrl(src) ? src : "/no-image.svg"}
      alt="alt"
      loading="lazy"
    />
  </picture>
);

export default LazyImage;
