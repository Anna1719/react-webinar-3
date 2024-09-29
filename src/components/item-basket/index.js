import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const navigate = useNavigate();

  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
  };

  const onTitleClick = () => {
    props.onClose();
    navigate(props.link);
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link to={props.link} className={cn("title")} onClick={onTitleClick}>
        {props.item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.languageSettings.Pcs}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{props.languageSettings.Remove}</button>
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

// ItemBasket.defaultProps = {
//   onRemove: () => {},
// };

export default memo(ItemBasket);
