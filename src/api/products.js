import axios from "./axios";

export const getProducts = () => axios(`products`);

export const getProduct = (id) => axios(`products/${id}`);

export const getTitleProduct = (title) => axios(`products/?title=${title}`);

export const getPriceProduct = (price) => axios(`products/price=${price}`);

export const getPriceRangeProduct = (price_min,price_max) => axios(`products/?price_min=${price_min}&price_max=${price_max}`);

export const getCategoryProduct = (category) => axios(`products/?categoryId=${category}`);

export const joinFilterProduct = (title,prince_min,price_max,category) => axios(`products/
?title=${title}&price_min=${prince_min}&price_max=${price_max}&categoryId=${category}`);