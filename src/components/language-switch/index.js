import {memo, useEffect, useState} from "react";
import "./style.css";

function languageSwitch({lang, onSwitch}) {

  return (
    <div className='Language'>
      <button className={lang === 'en' ? `Language-active` :  `Language-inactive`} onClick={() => onSwitch('en')}>
        ENG
      </button>
      <button className={lang === 'ru' ? `Language-active` :  `Language-inactive`} onClick={() => onSwitch('ru')}>
        RUS
      </button>
    </div>
  );
}

export default memo(languageSwitch);