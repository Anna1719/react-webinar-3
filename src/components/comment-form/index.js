import { memo, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentForm({ onSubmit, onCancel, isAnswer, t }) {
  const cn = bem('CommentField');
  const ref = useRef(null);

  useLayoutEffect(() => {
    if(isAnswer) ref.current.scrollIntoView({behavior: 'smooth', block: 'center'});
  }, []);

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
