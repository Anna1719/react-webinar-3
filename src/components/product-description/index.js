import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import useSelector from '../../store/use-selector';
import { translation } from '../../translation';
import './style.css';

function ProductDescription({ product, onAdd }) {
    const cn = bem('ProdDescr');

    const language = useSelector(state => state.language.language);
    const add = language === 'ru' ? translation.ru.add : translation.en.add;
    const country = language === 'ru' ? translation.ru.country : translation.en.country;
    const category = language === 'ru' ? translation.ru.category : translation.en.category;
    const price = language === 'ru' ? translation.ru.price : translation.en.price;
    const year = language === 'ru' ? translation.ru.year : translation.en.year;

    const addToBasket = () => {
        onAdd(product._id);
    };

    return (
        <div className={cn()}>
          <div className={cn('content')}>{product.description}</div>
          <div className={cn('content')}>
            <span className={cn("content-title")}>{country}: </span>
            <span className={cn('content-description')}>{product.madeIn?.title || 'Отсутствует'}</span>
          </div>
          <div className={cn('content')}>
            <span className={cn("content-title")}>{category}: </span>
            <span className={cn('content-description')}>{product.category?.title || 'Отсутствует'}</span>
          </div>
          <div className={cn('content')}>
            <span className={cn("content-title")}>{year}: </span>
            <span className={cn('content-description')}>{product.edition || 'Отсутствует'}</span>
          </div>
          <div className={cn('content')}>{price}: {numberFormat(product.price)} ₽</div>
          <button type="button" onClick={addToBasket} className={cn('content-button')}>
            {add}
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