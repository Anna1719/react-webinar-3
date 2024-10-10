import { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentForm({ onSubmit, onCancel, placeholder, isAnswer, t }) {
  const cn = bem('CommentField');
  const ref = useRef(null);

  const onSend = e => {
    e.preventDefault();
    const value = ref.current?.value;
    if (value.trim()) {
      ref.current.value = '';
      onSubmit(value);
    }
  };

  return (
    <form className={cn()} onSubmit={onSend}>
      <h3 className={cn('title')}>
        {isAnswer ? t('comment.title.answer') : t('comment.title.comment')}
      </h3>
      <textarea
        ref={ref}
        className={cn('textarea')}
        placeholder={
          isAnswer
            ? t('comment.placeholder.answer') + ' ' + placeholder
            : t('comment.placeholder.comment')
        }
      />
      <div className={cn('buttons')}>
        <button>{t('comment.send')}</button>
        {onCancel && <button onClick={onCancel}>{t('comment.cancel')}</button>}
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  t: PropTypes.func,
  isAnswer: PropTypes.bool
};

export default memo(CommentForm);
