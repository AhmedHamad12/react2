import React from 'react';
import ProductCard from './productCard';


const TrendingProducts = () => {
  const products = [
    { id: 1, title: "Sports T-shirt with high quality materials and colors...", link: "src\\assets\\image 3.svg" },
    { id: 2, title: "Sports T-shirt with high quality materials and colors...", link: "src\\assets\\Rectangle 5.svg" },
    { id: 3, title: "Sports T-shirt with high quality materials and colors...", link: "src\\assets\\Rectangle5.svg" },
  ];

  return (
    <section className="trending-products">
      <h2>Trending Products</h2>
      <div className="product-list">
      {products.map((product) => (
  <ProductCard key={product.id} id={product.id} title={product.title} link={product.link} />
      ))}

      </div>
    </section>
  );
};

export default TrendingProducts;
