import { FaShippingFast, FaRegCreditCard, FaTshirt } from 'react-icons/fa';

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="feature">
        <FaShippingFast className='icon' />
        <p>Free Shipping</p>
      </div>
      <div className="feature">
        <FaTshirt className='icon'/>
        <p>Cotton Material</p>
      </div>
      <div className="feature">
        <FaRegCreditCard className='icon'/>
        <p>Flexible Payment</p>
      </div>
    </section>
  );
};

export default FeaturesSection