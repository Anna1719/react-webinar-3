import StoreModule from "../module";

class Language extends StoreModule {

  initState() {
    return {
      language: 'ru'
    }
  }

  /**
   * Смена языка
   * @param lang 
   */
  switchLanguage(lang) {
    this.setState({
      ...this.getState(),
      language: lang,
    }, 
    `switched to ${lang}`);
  }
}

export default Language;