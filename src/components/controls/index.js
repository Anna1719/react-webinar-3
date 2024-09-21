import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { getCartPrice, plural } from "../../utils";

function Controls({ cart = [], toggleCart = () => {}, uniqueItems, totalPrice}) {
  return (
    <div className="Controls">
      <div className="List_wrapper">
        <div>В корзине: </div>
        {!cart?.length && (
        <div className='Empty'>пусто</div>
        )}
        {!!cart?.length && (
          <div>
            {uniqueItems}{" "}
            {`${plural(cart.length, { one: "товар", few: "товарa", many: "товаров",})}`} / {totalPrice.toLocaleString()} ₽
          </div>
        )}
      </div>
        <button className="Button_cart" onClick={() => toggleCart(true)}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  cart: PropTypes.array,
  toggleCart: PropTypes.func,
  uniqueItems: PropTypes.number,
  totalPrice: PropTypes.number,
};

export default React.memo(Controls);