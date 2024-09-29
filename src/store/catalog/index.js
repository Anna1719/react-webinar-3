import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      count: 0,
      currentPage: 1,
      totalPages: 1,
    };
  }

  async load(limit) {
    const skip = (this.getState().currentPage - 1) * limit;
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
    console.log(response)
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
        totalPages: Math.ceil(json.result.count / limit),
      },
      'Загружены товары из АПИ',
    );
  }

  setCurrentPage(page) {
    this.setState({
      ...this.getState(),
      currentPage:page
    })
  }
}

export default Catalog;
