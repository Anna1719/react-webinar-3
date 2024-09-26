import { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { translation } from '../../translation';

function Main() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const onPageChange = (page) => {
    setCurrentPage(page);
  }

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load(itemsPerPage, (currentPage - 1) * itemsPerPage);
  }, [currentPage]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    total: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title={select.lang.language === 'ru' ? translation.ru.title : translation.en.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination total={Math.ceil(select.total/10)} current={currentPage} onPageChange={(page) => onPageChange(page)} />
    </PageLayout>
  );
}

export default memo(Main);
