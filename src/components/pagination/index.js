import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const dots = '...';
const cn = bem('Pagination');

function getPagesView(total, current) {
  const viewPages = [];
  viewPages.push(1);

  switch (current) {
    case 1: {
      viewPages.push(2, 3);
      if (total>4) {
        viewPages.push(dots);
      }
      break;
    }
    case total: {
      if (total>3) {
        viewPages.push(dots);
      }
      viewPages.push(total-2, total-1);
      break;
    }
    default: {
      if (current>3) viewPages.push(dots);

      for (let i = Math.max(2, current-1); i <= Math.min(total-1, current+1); i++) {viewPages.push(i);}

      if (current < total-2) viewPages.push(dots);
    }
  }
  if (total>1) {
    viewPages.push(total);
  }
  console.log(viewPages);
  return viewPages;
}

function Pagination({ total, current, onPageChange }) {
    return (
        <div className={cn()}>
        {getPagesView(total, current).map((page, index) => (
            page === dots
            ?
            <span className={cn('dots')} key={index}>{page}</span>
            :
            <button 
                className={page === current? cn('active') : cn('inactive')} 
                key={index} 
                onClick={() => onPageChange(page)}
                >
                {page}
            </button>
        ))}
    </div>
    );
}

Pagination.propTypes = {
    total: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default memo(Pagination);