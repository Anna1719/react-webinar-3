import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { formatDate } from '../../utils/format-date';
import './style.css';

function CommentsItem({ comment, onReply, t }) {
  const cn = bem('CommentsItem');
  return (
    <div className={cn()}>
      <div className={cn('info')}>
        <div className={cn('name')}>{comment.author?.profile?.name}</div>
        <div className={cn('date')}>{formatDate(comment.dateCreate)}</div>
      </div>
      <div className={cn('text')}>{comment.text}</div>
      <button className={cn('button')} onClick={() => onReply(comment._id)}>
        {t('comments.answer')}
      </button>
    </div>
  );
}

CommentsItem.propTypes = {
  comment: PropTypes.object.isRequired,
  onReply: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default memo(CommentsItem);
