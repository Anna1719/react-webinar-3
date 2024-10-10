export const initialState = {
  count: 0,
  data: [],
  waiting: false,
  error: '',
};

function reducer(state = initialState, action) {

  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: [], waiting: true };

    case 'comments/load-success': {
      const { data, count } = action.payload;
      return { ...state, data, count, waiting: false, error: '' };
    }

    case 'comments/load-error':
      return { ...state, data: [], waiting: false, error: 'Can`t load comments' };

    case 'comments/add-success': {
      const count = state.count + 1;
      const data = [...state.data, action.payload];
      return { ...state, data, count, waiting: false, error: '' };
    }

    case 'comments/add-error':
      return { ...state, waiting: false, error: 'Can`t add new comment' };

    default:
      return state;
  }
}

export default reducer;
