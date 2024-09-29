import {memo, useCallback, useEffect, useState} from 'react';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useParams} from "react-router-dom";
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import BasketTool from '../../components/basket-tool';
import ProductDescription from '../../components/product-description';
import { product } from '../../store/exports';

function Product() {

  const {id} = useParams(); 
  const store = useStore();
  // const [isLoading, setIsLoading] = useState(true);

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
    product: state.product.item,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.language,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    onLanguageSwitch: useCallback((lang)=> store.actions.language.switchLanguage(lang), [store]),
  }

  useEffect(() => {
    store.actions.product.load(id);
    store.actions.modals.close();
  }, [store, id]);


  return (
    <div>
      <PageLayout>
          <Head title={select.product.title} currentLanguage={select.lang} onLangSwitch={callbacks.onLanguageSwitch}/>
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} languageSettings={language}/>
          {select.product && <ProductDescription product={select.product} onAdd={callbacks.addToBasket} languageSettings={language}/>}
      </PageLayout>
    </div>
  );
}

export default memo(Product);