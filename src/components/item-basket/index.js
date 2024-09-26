import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';
import useStore from '../../store/use-store';
import { useNavigate } from 'react-router';
import useSelector from '../../store/use-selector';
import { translation } from '../../translation';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const store = useStore();
  const navigate = useNavigate();

  const language = useSelector(state => state.language.language);
  const pcs = language === 'ru' ? translation.ru.pcs : translation.en.pcs;
  const remove = language === 'ru' ? translation.ru.remove : translation.en.remove;

  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const onTitleClick = () => {
    callbacks.closeModal();
    navigate(`/${props.item._id}`);
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link to={`/${props.item._id}`} className={cn("title")} onClick={onTitleClick}>
        {props.item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {pcs}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{remove}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
