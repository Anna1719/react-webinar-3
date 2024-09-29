import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import MainMenu from '../main-menu';
import './style.css';

function BasketTool({ sum, amount, onOpen, languageSettings }) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <MainMenu name={languageSettings.Main} />
      <div className={cn('wrap')}>
        <span className={cn('label')}>{languageSettings.InCart}:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: languageSettings.One,
                few: languageSettings.Few,
                many: languageSettings.Many,
              })} / ${numberFormat(sum)} ₽`
            : languageSettings.Empty}
        </span>
        <button onClick={onOpen}>{languageSettings.Open}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

// BasketTool.defaultProps = {
//   onOpen: () => {},
//   sum: 0,
//   amount: 0,
// };

export default memo(BasketTool);
