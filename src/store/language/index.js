import StoreModule from "../module";
import { translation } from "./translation";

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

  getTranslation(sent){
    const currentLang = this.getState().language;

    switch(currentLang){
      case 'ru': return translation['ru'][sent]; 
      case 'en': return translation['en'][sent];
    }
  }
}

export default Language;