import React from "react";

function Product({ id, title, img, categorie, price }) {
  const isValidImageUrl = (imageUrl) => {
    return imageUrl && imageUrl.startsWith("http");
  };

  return (
    <>
      <div key={id} className="flex flex-col items-center">
        <p>{categorie}</p>
        <h1>{title}</h1>
        {isValidImageUrl(img) ? (
          <img className="sm:w-24" src={img} alt={title} />
        ) : (
          <img
            className="w-24 sm:w-24 md:w-52 lg:w-52"
            src="../../public/no-image.svg"
            alt="No Image"
          />
        )}
        <p>S/.{price}</p>
      </div>
    </>
  );
}

export default Product;
