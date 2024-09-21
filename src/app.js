import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Cart from './components/cart'
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal'

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const callbacks = {

    toggleCart: useCallback(() => 
      setIsModalOpen(!isModalOpen), 
      [isModalOpen]
    ),

    onCartAddItem: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),

    onDeleteItem: useCallback(
      code => {
        store.deleteCartItem(code);
      },
      [store],
    ),

  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls 
        cart={cart} 
        toggleCart={callbacks.toggleCart}
      />
      <List
        list={list}
        onCartAddItem={callbacks.onCartAddItem}
      />
      <Modal isModalOpen={isModalOpen} >
       <Cart
        cart={cart}
        onDeleteItem={callbacks.onDeleteItem}
        toggleCart={callbacks.toggleCart}
      />
      </Modal>
    </PageLayout>
  );
}

export default App;
