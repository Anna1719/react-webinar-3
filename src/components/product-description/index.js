import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import './style.css';

function ProductDescription({ product, onAdd, languageSettings }) {
    const cn = bem('ProdDescr');

    const addToBasket = () => {
        onAdd(product._id);
    };

    return (
        <div className={cn()}>
          <div className={cn('content')}>{product.description}</div>
          <div className={cn('content')}>
            <span className={cn("content-title")}>{languageSettings.Country}: </span>
            <span className={cn('content-description')}>{product.madeIn?.title || 'Отсутствует'}</span>
          </div>
          <div className={cn('content')}>
            <span className={cn("content-title")}>{languageSettings.Category}: </span>
            <span className={cn('content-description')}>{product.category?.title || 'Отсутствует'}</span>
          </div>
          <div className={cn('content')}>
            <span className={cn("content-title")}>{languageSettings.Year}: </span>
            <span className={cn('content-description')}>{product.edition || 'Отсутствует'}</span>
          </div>
          <div className={cn('content')}>{languageSettings.Price}: {numberFormat(product.price)} ₽</div>
          <button type="button" onClick={addToBasket} className={cn('content-button')}>
            {languageSettings.Add}
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