import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item, onCartAddItem = () => {} }) {

  const handleAddItem = () => {
    onCartAddItem(item.code);
  };

  return (
    <div className = {'Item'}>
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title}</div>
      <div className="Item-price">{item.price.toLocaleString()} ₽</div>
      <div className="Item-actions">
        <button onClick={handleAddItem}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onCartAddItem: PropTypes.func,
};

export default React.memo(Item);
