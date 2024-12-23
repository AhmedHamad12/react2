import React , { useState } from 'react';
import RegisterForm from '../auth/rigsterform';

const ProductCard = (props) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleShowRegister = () => setShowRegisterModal(true);
  const handleCloseRegister = () => setShowRegisterModal(false);
  return (
    <>
    <div className="product-card">
      <img src={props.link} alt={props.title} className="product-image" />
      <div className="product-info">
        <p>{props.title}</p>
        <a href="#" onClick={handleShowRegister} className="see-more">See More ➔</a>
      </div>
    </div>
    <RegisterForm showModal={showRegisterModal} handleClose={handleCloseRegister} />

    </>
  );
};

export default ProductCard;
