import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function FormFrame(props) {
  const cn = bem('FormFrame');
  return (
    <div className={cn()}>
      <label className={cn('name')}>{props.name}</label>
      <div className={cn('input')}>
        {props.children}
      </div>
      <div className={cn('notice')}>
        {props.notice}
      </div>
    </div>
  )
}

FormFrame.propTypes = {
  name: PropTypes.node,
  notice: PropTypes.node,
  children: PropTypes.node,
}

FormFrame.defaultProps = {}

export default memo(FormFrame);