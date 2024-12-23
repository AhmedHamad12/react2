import React from 'react';

const SummerSale = () => {
  const products = Array(6).fill({ title: "Nike Sportswear", imageUrl: "src\\assets\\Rectangle 7.svg" });

  return (
    <section className="summer-sale">
      <h2>Summer Sale</h2>
      <div className="sale-products">
        {products.map((product, index) => (
          <div key={index} className="sale-product">
            <img src={product.imageUrl} alt={product.title} />
            <p>{product.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SummerSale;
