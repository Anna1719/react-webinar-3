import { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { translation } from '../../store/language/translation';

function Main() {
  const store = useStore();

  const [itemsPerPage] = useState(10);

  const currentLanguage = store.actions.language;
  console.log(currentLanguage);
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


  useEffect(() => {
    store.actions.catalog.load(itemsPerPage);
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    totalItems: state.catalog.count,
    totalPages: state.catalog.totalPages,
    currentPage: state.catalog.currentPage,
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
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} link={`/${item._id}`} languageSettings={language}/>;
      },
      [callbacks.addToBasket, language],
    ),
  };

  return (
    <PageLayout>
      <Head title={language.Title} currentLanguage={select.lang} onLangSwitch={callbacks.onLanguageSwitch}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} languageSettings={language}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination
        total={select.totalPages}
        current={select.currentPage}
        onPageChange={page => {
          store.actions.catalog.setCurrentPage(page);
          store.actions.catalog.load(itemsPerPage);
        }}
      />
    </PageLayout>
  );
}

export default memo(Main);
