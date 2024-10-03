import StoreModule from '../module';

class User extends StoreModule {
  initState() {
    return {
      userData: {},
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

      if (!response.ok) {
        this.setState(
          { ...this.getState(), error: json.error.message, wait: false },
          'Authorization failed',
        );
      } else {
        console.log('response', response);
        const json = await response.json();

        if (!json.error) {
          this.setState(
            {
              ...this.initState(),
              token: json.result.token,
              userData: json.result.user,
              auth: true,
              wait: false,
            },
            'Authorization successfull',
          );
          localStorage.setItem('token', json.result.token);
          if (onAuth) onAuth();
        }
      }
    } catch (e) {
      this.setState({ ...this.getState(), error: e.message, wait: false }, 'Authorization failed');
    }
  }

  async getUser() {
    const token = this.getState().token || localStorage.getItem('token');
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
