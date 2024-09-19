import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { getCartPrice, plural } from "../../utils";

function Controls({ cart = [], toggleCart = () => {} }) {
  return (
    <div className="Controls">
      <div className="List_wrapper">
        <div>В корзине: </div>
        {!cart?.length && (
        <div className='Empty'>пусто</div>
        )}
        {!!cart?.length && (
          <div>
            {cart.length}{" "}
            {`${plural(cart.length, { one: "товар", few: "товарa", many: "товаров",})}`} / {getCartPrice(cart)} ₽
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
};

export default React.memo(Controls);