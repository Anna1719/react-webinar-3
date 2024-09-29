import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Basket() {
  const store = useStore();

  const currentLanguage = store.actions.language;
  const language = {
    Main: currentLanguage.getTranslation('main'),
    Title: currentLanguage.getTranslation('title'),
    Cart: currentLanguage.getTranslation('cart'),
    InCart: currentLanguage.getTranslation('incart'),
    Total: currentLanguage.getTranslation('total'),
    Add: currentLanguage.getTranslation('add'),
    Open: currentLanguage.getTranslation('open'),
    Close: currentLanguage.getTranslation('close'),
    Remove: currentLanguage.getTranslation('remove'),
    Empty: currentLanguage.getTranslation('empty'),
    One: currentLanguage.getTranslation('one'),
    Few: currentLanguage.getTranslation('few'),
    Many: currentLanguage.getTranslation('many'),
    Country: currentLanguage.getTranslation('country'),
    Category: currentLanguage.getTranslation('category'),
    Year: currentLanguage.getTranslation('year'),
    Price: currentLanguage.getTranslation('price'),
    Pcs: currentLanguage.getTranslation('pcs'),
};

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        return <ItemBasket item={item} link={`/${item._id}`} onClose={callbacks.closeModal} onRemove={callbacks.removeFromBasket} languageSettings={language}/>;
      },
      [callbacks.removeFromBasket],
    ),
  };

  return (
    <ModalLayout title={language.Cart} onClose={callbacks.closeModal} languageSettings={language}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} languageSettings={language}/>
    </ModalLayout>
  );
}

export default memo(Basket);
