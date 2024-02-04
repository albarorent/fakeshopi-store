import React from "react";
import { Link } from "react-router-dom";
import { TbShoppingCart } from "react-icons/tb";

function Product({ id, title, img, categorie, price }) {
  const isValidImageUrl = (imageUrl) => {
    return imageUrl && imageUrl.startsWith("http");
  };

  return (
    <>
      <div key={id} className="flex flex-col gap-1 group border border-slate-100 hover:bg-neutral-200 hover:shadow-lg hover:border-transparent p-4 rounded-md">
        <Link to={`/productos/${id}`}>
          <p className="text-xs text-neutral-500">{categorie}</p>
        </Link>
        <Link to={`/productos/${id}`} className="text-base text-blue-600 font-bold">
          {title.length > 10 ? `${title.slice(0, 20)}...` : title}
        </Link>
        {isValidImageUrl(img) ? (
          <Link to={`/productos/${id}`}>
            <img className="w-24 sm:w-24 md:w-40 lg:w-52" src={img} alt={title} />
          </Link>
        ) : (
          <Link to={`/productos/${id}`}>
            <img
              className="w-full sm:w-24 md:w-36 lg:w-52"
              src="/no-image.svg"
              alt="No Image"
            />
          </Link>
        )}
        <div className="flex justify-between ">
          <Link to={`/productos/${id}`} className="text-xl text-gray-700 font-medium"><p>S/{price}</p></Link>
          <Link to={`/productos/${id}`} className="rounded-full text-white p-2" style={{ backgroundColor: "#0400C3" }}><TbShoppingCart/></Link>
        </div>
      </div>
    </>
  );
}

export default Product;
