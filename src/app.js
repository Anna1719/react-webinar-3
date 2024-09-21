import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
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
  const unique = store.getState().unique;
  const total = store.getState().total;

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
        uniqueItems={unique}
        totalPrice={total}
      />
      <List
        list={list}
        onButtonPress={callbacks.onCartAddItem}
        isCart={false}
      />
      <Modal isModalOpen={isModalOpen} modalName={"Корзина"} toggleModal={callbacks.toggleCart}>
      <List
        list={cart}
        onButtonPress={callbacks.onDeleteItem}
        isCart={true}
        totalPrice={total}
      />
      </Modal>
    </PageLayout>
  );
}

export default App;
