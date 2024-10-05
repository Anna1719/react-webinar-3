import StoreModule from '../module';
import { toList, getTranformedArray } from '../../utils';

class Categories extends StoreModule {
  initState() {
    return {
      list: []
    };
  }

  async getCategories() {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: [{value: 'all', title: 'Все'}, ...getTranformedArray(toList(json.result.items),0)],
      },
      'Загружены категории',
    );
  }
}

export default Categories;