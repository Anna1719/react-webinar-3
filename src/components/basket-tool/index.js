import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import useSelector from '../../store/use-selector';
import { Link } from 'react-router-dom';
import { translation } from '../../translation';
import './style.css';

function BasketTool({ sum, amount, onOpen }) {
  const language = useSelector(state => state.language.language);
  const mainName = language === 'ru' ? translation.ru.main : translation.en.main;
  const label = language === 'ru' ? translation.ru.label : translation.en.label;
  const empty = language === 'ru' ? translation.ru.empty : translation.en.empty;
  const pieces = language === 'ru' ? translation.ru.pieces : translation.en.pieces;
  const open = language === 'ru' ? translation.ru.open : translation.en.open;

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Link to="/" className={cn('home')}>
        {mainName}
      </Link>
      <span className={cn('label')}>{label}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
              one: pieces.one,
              few: pieces.few,
              many: pieces.many,
            })} / ${numberFormat(sum)} ₽`
          : empty}
      </span>
      <button onClick={onOpen}>{open}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
