import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import useSelector from '../../store/use-selector';
import { translation } from '../../translation';
import './style.css';

function BasketTotal({ sum }) {
  const cn = bem('BasketTotal');

  const language = useSelector(state => state.language.language);
  const total = language === 'ru' ? translation.ru.total : translation.en.total;

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{total}:</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

BasketTotal.defaultProps = {
  sum: 0,
};

export default memo(BasketTotal);
