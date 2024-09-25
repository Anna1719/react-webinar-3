import {memo, useCallback, useEffect, useState} from 'react';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useParams} from "react-router-dom";
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import BasketTool from '../../components/basket-tool';
import ProductDescription from '../../components/product-description';

function Product() {

  const [productData, setProductData] = useState({});
  const {id} = useParams(); 
  const store = useStore();
  const [isLoading, setIsLoading] = useState(true);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  useEffect(() => {
   (async () => {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
      const json = await response.json();
      setProductData(json.result);
      setIsLoading(false);
    })()     
  }, [id])


  return (
    <div>
      <PageLayout>
        {!isLoading &&
        <>
          <Head title={productData.title} />
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
          {productData && <ProductDescription product={productData} onAdd={callbacks.addToBasket} />}
        </>}
      </PageLayout>
    </div>
  );
}

export default memo(Product);