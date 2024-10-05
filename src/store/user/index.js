import StoreModule from '../module';

class User extends StoreModule {
  initState() {
    return {
      userData: {
        email: '',
        name: '',
        phone: '',
      },
      token: null,
      error: null,
      auth: false,
      wait: true,
    };
  }

  /**
   * Сброс ошибки
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  resetError() {
    this.setState(
      {
        ...this.getState(),
        error: null,
      },
      '',
    );
  }

  /**
   * Авторизация (вход)
   * onAuth: функция, которая выполяется при успешной авторизации
   * 1. Передача ее как параметра помогает избежать дополнительной проверки на авторизацию на странице login
   * 2. Дает возможность изменить адрес перехода на другую страницу в случае успешной авторизации
   * 3. В случае если нужно остаться на странице, функцию в качестве параметра можно не указывать при вызове,
   * что не даст ошибки, так как onAuth проверяется перед ее вызовом
   */
  async Login(login, password, onAuth) {
    this.setState({
      ...this.getState(),
      wait: true,
    });

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      const json = await response.json();
      console.log('json', json);

      if (!json.error) {
        this.setState(
          {
            ...this.initState(),
            token: json.result.token,
            userData: {
              email: json.result.user.email,
              name: json.result.user.profile.name,
              phone: json.result.user.profile.phone,
            },
            auth: true,
            wait: false,
          },
          'Authorization successfull',
        );
        localStorage.setItem('token', json.result.token);

        if (onAuth) onAuth();

      } else {
        this.setState(
          {
            ...this.getState(),
            error: json.error.data.issues[0].message,
            auth: false,
            wait: false,
          },
          'Authorization failed',
        );
      }
    } catch (e) {
      this.setState(
        { ...this.getState(), error: e.message, auth: false, wait: false },
        'Authorization failed',
      );
    }
  }

  async getUser() {
    const token = this.getState().token || localStorage.getItem('token');
    if (token) {
      const response = await fetch('api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Content-type': 'application/json',
        },
      });
      const json = await response.json();
      console.log(json);
      this.setState({
        ...this.getState(),
        userData: {
          email: json.result.email,
          name: json.result.profile.name,
          phone: json.result.profile.phone,
        },
        auth: true,
        token: token,
        wait: false,
      });
    } else {
      this.setState(
        {
          ...this.getState(),
          wait: false,
          auth: false,
        },
        'User is not logged in',
      );
    }
  }

  async logOut() {
    const token = this.getState().token || localStorage.getItem('token');
    this.setState({
      ...this.getState(),
      wait: true,
    });
    try {
      const responce = await fetch('api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': token,
          'Content-type': 'application/json',
        },
      });
      const json = await responce.json();
      console.log(json);
      this.setState({
        token: null,
        error: null,
        auth: false,
        wait: false,
      });

      localStorage.removeItem('token');
    } catch (error) {
      this.setState({ ...this.getState(), error: error, wait: false }, 'Error');
    }
  }
}

export default User;
