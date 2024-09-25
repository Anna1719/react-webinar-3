import { memo, useEffect } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import './style.css';

function ProductDescription({ product, onAdd }) {
    const cn = bem('ProdDescr');

    // useEffect(() => {
    //     console.log('Текущий товар:', product);
    // }, [product]);

    const addToBasket = () => {
        onAdd(product._id);
    };

    return (
        <div className={cn()}>
          <div className={cn('content')}>{product.description}</div>
          <div className={cn('content')}>
            <span className={cn("content-title")}>Страна производитель: </span>
            <span className={cn('content-description')}>{product.madeIn?.title || 'Отсутствует'}</span>
          </div>
          <div className={cn('content')}>
            <span className={cn("content-title")}>Категория: </span>
            <span className={cn('content-description')}>{product.category?.title || 'Отсутствует'}</span>
          </div>
          <div className={cn('content')}>
            <span className={cn("content-title")}>Год выпуска: </span>
            <span className={cn('content-description')}>{product.edition || 'Отсутствует'}</span>
          </div>
          <div className={cn('content')}>Цена: {numberFormat(product.price)} ₽</div>
          <button type="button" onClick={addToBasket} className={cn('content-button')}>
            Добавить
          </button>
        </div>
    );
}

ProductDescription.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        description: PropTypes.string,
        madeIn: PropTypes.shape({
            title: PropTypes.string,
        }),
        category: PropTypes.shape({
            title: PropTypes.string,
        }),
        edition: PropTypes.number,
        price: PropTypes.number,
    }).isRequired,
    onAdd: PropTypes.func.isRequired,
};

export default memo(ProductDescription);