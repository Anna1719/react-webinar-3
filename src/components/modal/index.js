import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Modal({ children, isModalOpen = false, modalName, toggleModal = () => {}}) {
  const cn = bem('Modal');

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className={cn()}>
      <div className={cn('wrapper')}>
        <div className="Modal_header">
          <div className="Modal_name">{modalName}</div>
          <button onClick={toggleModal}>Закрыть</button>
        </div>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  modalName: PropTypes.string,
  toggleModal: PropTypes.func,
};

export default React.memo(Modal);