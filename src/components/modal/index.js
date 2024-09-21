import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Modal({ children, isModalOpen = false}) {
  const cn = bem('Modal');

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className={cn()}>
      <div className={cn('center')}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
};

export default React.memo(Modal);