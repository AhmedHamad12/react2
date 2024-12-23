import React from "react";

const ProductList = ({ products, onBuy }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} />
          <div className="details">
            <h3>{product.title}</h3>
            <p>Sizes: {product.sizes.join(", ")}</p>
            <p>Price: {product.price}</p>
            <p className="old-price">Old Price: {product.oldPrice}</p>
            <div className="colors">
              {product.colors.map((color, index) => (
                <span
                  key={index}
                  className="color"
                  style={{ backgroundColor: color }}
                ></span>
              ))}
            </div>
            <button className="buy-button" onClick={() => onBuy(product)}>
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
