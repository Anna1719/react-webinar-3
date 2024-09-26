import {memo, useEffect, useState} from "react";
import "./style.css";
import useStore from "../../store/use-store";

function languageSwitch() {
  const [language, setLanguage] = useState('ru');
  
  const store = useStore();

  const onSwitch = (lang) => {
    setLanguage(lang);
  }

  useEffect(() => {
    store.actions.language.switchLanguage(language);
  }, [language])

  return (
    <div className='Language'>
      <button className={language === 'en' ? `Language-active` :  `Language-inactive`} onClick={() => onSwitch('en')}>
        ENG
      </button>
      <button className={language === 'ru' ? `Language-active` :  `Language-inactive`} onClick={() => onSwitch('ru')}>
        RUS
      </button>
    </div>
  );
}

export default memo(languageSwitch);