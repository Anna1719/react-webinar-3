import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function UnauthComment({ showButton, onCancel, t }) {
  const cn = bem('UnauthComment');
  const location = useLocation();

  return (
    <div className={cn()}>
      <Link className={cn('link')} to="/login" state={{ back: location.pathname }}>
        {t('unauth.link')}
      </Link>
      <div>, {showButton ? t('unauth.answer') : t('unauth.comment')}</div>
      {showButton && (
        <button className={cn('cancel')} onClick={onCancel}>
          {t('comment.cancel')}
        </button>
      )}
    </div>
  );
}

export default UnauthComment;
