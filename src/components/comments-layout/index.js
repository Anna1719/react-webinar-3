import React, {memo} from "react";
import './style.css';
import PropTypes from "prop-types";

function CommentsLayout({children, count, t}){
  return(
    <div className={'CommentsLayout'}>
      <h2>{`${t('comments.title')} (${count})`}</h2>
      {children}
    </div>
  )
}

CommentsLayout.propTypes = {
  children: PropTypes.node,
  count: PropTypes.number,
  t: PropTypes.func
}

export default memo(CommentsLayout)