import { Link, useLocation, useNavigate } from "react-router-dom";
import Product from "../Components/Product";
import { useShopify } from "../context/ShopifyContext";
import { useEffect, useState } from "react";
import { getCategoryProduct } from "../api/products";
import { TESelect } from "tw-elements-react";

function Products() {
  const { products, categories, setProducts, loading, setLoading, getCat } =
    useShopify();
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryId = params.get("c");
  const [selectValue, setSelectValue] = useState(0);

  const itemsPerPage = 16;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = Array.isArray(products) ? products.slice(startIndex, endIndex) : [];


  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      setCurrentPage(1);
      const getProductId = async () => {
        const res = await getCategoryProduct(categoryId);
        setProducts(res.data);
        setLoading(false);
      };
      getProductId();
    }
    const fetchCategories = async () => {
      await getCat();
    };

    fetchCategories();
  }, [categoryId]);

  const teSelectData = categories.slice(0, 12).map((category) => ({
    text: category.name,
    value: category.id,
  }));

  const onHandlevalue = (event) => {
    setSelectValue(event.value);
    setCurrentPage(1);
    navigate("/productos/?c=" + event.value);
  };

  useEffect(() => {
    if (categoryId) {
      setSelectValue(parseInt(categoryId));
    }
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="grid grid-cols-5  gap-5 justify-items-center">
      <div className="w-full hidden sm:hidden md:flex lg:flex flex-col col-span-1  gap-10 py-5">
        <div className="hidden sm:flex flex-col gap-3 border border-slate-300">
          {categories.slice(0, 12).map((categorie) => (
            <div
              key={categorie.id}
              className="w-full border-b border-slate-300 p-3"
            >
              <Link to={`/productos/?c=${categorie.id}`}>
                <h1 className="text-sm">{categorie.name}</h1>
              </Link>
            </div>
          ))}
        </div>
        <div className="px-3 hidden sm:flex flex-col gap-2 w-full">
          <h1>Filtrar por precio</h1>
          <input type="range" />
        </div>
      </div>
      <div className="flex sm:hidden col-span-6 pt-8">
        <TESelect
          value={selectValue}
          onValueChange={(event) => {
            onHandlevalue(event);
          }}
          data={teSelectData}
          label="Categorias"
          search
        />
      </div>
      <div className="w-full sm:w-full md:w-full col-span-6 sm:col-span-5 md:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center sm:justify-items-center md:justify-items-center lg:justify-items-center  gap-2 py-5">
        {products.length === 0 ? (
          <h1>No se encuentran productos...</h1>
        ) : loading ? (
          <h1>Loading...</h1>
        ) : (
          Array.isArray(products) &&
          currentProducts.map((product) => (
            <div
              className="w-full sm:w-[180px] md:w-[180px] lg:w-full "
              key={product.id}
            >
              <Product
                id={product.id}
                title={product.title}
                img={product.images[0]}
                categorie={product.category.name}
                price={product.price}
              />
            </div>
          ))
        )}
       
      </div>
      <div className="pagination pb-5 col-span-6 flex gap-3 ">
          {Array.from(
            { length: Math.ceil(products.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={index + 1 === currentPage ? "active border-b-2 border-blue-900 w-6" : ""}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
    </div>
  );
}

export default Products;
