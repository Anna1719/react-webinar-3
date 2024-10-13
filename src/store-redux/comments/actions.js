export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load-start' });
      try {
        const res = await services.api.request({ url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}` });
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result.items, count:  res.data.result.count} });
      } catch (e) {
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  /**
   * Добавление комментария
   */

  add: (comment, userName) => {
    return async (dispatch, getState, services) => {
        dispatch({type: 'comments/add-start'});
      try {
        const res = await services.api.request({
          method: 'POST',
          url: `/api/v1/comments`,
          body: JSON.stringify(comment),
        });
        dispatch({ type: 'comments/add-success', payload:{ ... res.data.result, author: { profile: { name: userName } } }});
      } catch (e) {
        console.error({ e });
        dispatch({ type: 'comments/add-error' });
      }
    };
  },
};
