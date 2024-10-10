import useServices from './use-services';
import { useEffect, useState, useMemo } from 'react';

export default function useTranslate() {
  const { i18n } = useServices();
  const [lang, setLang] = useState(i18n.getLang());

  const t = (text, number) => {
    return i18n.translate(text, number);
  };

  const unsubscribe = useMemo(() => {
    return i18n.subscribe(lang => {
      setLang(lang);
    });
  }, []);

  useEffect(() => {
    unsubscribe, [unsubscribe]
  });

  return { t, lang, setLang: (lang) => i18n.setLang(lang) };
}
