import translate from './translate';

/*
/ Сервис мультиязычности. 
/ Вариант: сервис мультиязычности устанавливает заголовок в сервисе АПИ при смене у себя кода языка
/ Был выбран этот вариант из-за его удобства. Проще получать данные с нужным переводом по измененному запросу.
*/

class I18nService {
  constructor(services, config = {}) {
    this.lang = localStorage.getItem('lang') || config.defaultLang || 'ru';
    this.listeners = [];
    this.services = services;
  }

  getLang() {
    return this.lang;
  }

  setLang(lang) {
    this.lang = lang;
    this.listeners.forEach(listener => listener(this.lang));
    this.services.api.defaultHeaders = {
      ...this.services.api.defaultHeaders,
      'Accept-Language': lang,
    };
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  translate(text, number) {
    return translate(this.lang, text, number);
  }
}

export default I18nService;
