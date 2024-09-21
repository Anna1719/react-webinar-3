import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartItem({ item, onDeleteItem = () => {} }) {
  return (
    <div className="Cart_item" key={item.code}>
        <div className="Item_code">{item.code}</div>
        <div className="Item_name">{item.title}</div>
        <div className="Item_price">{item.price.toLocaleString()} ₽ </div>
        <div className="Item_count">{item.count} шт </div>
        <div className="Item_action">
          <button onClick={() => onDeleteItem(item.code)}>Удалить</button>
        </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onDeleteItem: PropTypes.func,
};

export default React.memo(CartItem);