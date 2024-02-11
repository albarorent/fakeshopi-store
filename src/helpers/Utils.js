export const uniqueIds = (uniquePro) => {
    const uniqueIds = new Set();
    const uniqueProducts = uniquePro.filter((product) => {
      if (!uniqueIds.has(product.id)) {
        uniqueIds.add(product.id);
        return true;
      }
      return false;
    });

    return uniqueProducts;
};
