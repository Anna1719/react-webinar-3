/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Вычисление общей стоимости корзины
   */
  calculateCartTotalPrice(){
    let totalPrice = 0;
    for (let item of this.state.cart) {
      totalPrice += item.price * item.count;
    }
    return totalPrice;
  }

  /**
   * Добавление товара в корзину
   */
  addToCart(code) {
    const listItem = this.state.list.find(item => item.code === code);
    const cartItem = this.state.cart.find(item => item.code === code);
    if (cartItem) {
      this.setState({...this.state, cart: this.state.cart.map(curr =>
        curr.code === code ? { ...curr, count: curr.count + 1 } : curr,
        ),
      });
    } else {
      this.setState({...this.state, cart: [...this.state.cart, { ...listItem, count: 1 }],
      });
    }
    
    this.setState({...this.state,
      unique: this.state.cart.length,
      total: this.calculateCartTotalPrice(),
    });
  }

  /**
   * Удаление товара из корзины
   */
  deleteCartItem(code) {
    this.setState({
      ...this.state,
      cart: [...this.state.cart.filter(item => item.code !== code)],
    });

    this.setState({...this.state,
      unique: this.state.cart.length,
      total: this.calculateCartTotalPrice(),
    });
  }
}

export default Store;
