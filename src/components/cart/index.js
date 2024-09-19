import React from 'react';
import PropTypes from 'prop-types';
import CartItem from '../cart-item';
import {getCartPrice} from "../../utils";
import './style.css';

function Cart({cart = [], onDeleteItem = () => {}, isCartOpen = false, toggleCart = () => {},}) {

  if (!isCartOpen) {
    return null;
  }

  return (
    <div className="Cart">
      <div className="Cart_wrapper">
        <div className="Cart_header">
          <div className="Cart_name">Корзина</div>
          <button onClick={toggleCart}>Закрыть</button>
        </div>
        <div className="Cart_content">
            {!cart?.length && (
             <div className='Cart_empty'>Корзина пуста</div>
            )}
            {!!cart?.length && (
            cart.map(item => (
              <CartItem key={item.code} item={item} onDeleteItem={onDeleteItem} />
            ))
          )}
        </div>
        <div className="Cart_summary"> 
          <div className="Cart_price">
            <span>Итого </span>
            {getCartPrice(cart)} ₽
            </div>
        </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.array,
  onDeleteItem: PropTypes.func,
};

export default React.memo(Cart);