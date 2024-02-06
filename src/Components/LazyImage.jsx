import React from "react";

const LazyImage = ({ src, alt, w = "w-52  h-52" }) => (
  <picture>
    <source srcSet={src} type="image/webp" />
    <source srcSet={src} type="image/jpg" />
    <img
      className={`${w}`}
      src={src}
      alt={alt}
      loading="lazy"
      onError={(e) => {
        e.target.src = "/no-image.svg";
      }}
    />
  </picture>
);

export default LazyImage;
