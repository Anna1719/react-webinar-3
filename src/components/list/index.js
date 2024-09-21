import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import CartItem from '../cart-item'
import './style.css';

function List({list, onButtonPress = () => {}, isCart, totalPrice}) {

  return (
    <div className="List">
          {isCart ? (
            <div className="Cart_wrapper">
            <div className="Cart_content">
            {!list?.length && (
              <div className='Cart_empty'>Корзина пуста</div>
            )}
            {!!list?.length && (
            list.map(item => (
              <CartItem key={item.code} item={item} onDeleteItem={onButtonPress} />
              ))
            )}
           </div>
           <div className="Cart_summary"> 
           <div className="Cart_price">
             <span>Итого </span>
             {totalPrice.toLocaleString()} ₽
             </div>
          </div>
          </div>
          ):(
            list.map(item => (
            <div key={item.code} className={"List-item"}>
              <Item item={item} onCartAddItem={onButtonPress} />
            </div>
            ))
          )}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onButtonPress: PropTypes.func,
  isCart: PropTypes.bool,
  totalPrice: PropTypes.number,
};

export default React.memo(List);
