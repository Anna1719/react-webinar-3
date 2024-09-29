import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import LanguageSwitch from '../language-switch';

function Head({ title, currentLanguage, onLangSwitch}) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      <LanguageSwitch lang={currentLanguage} onSwitch={onLangSwitch}/>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
