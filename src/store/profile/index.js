import StoreModule from '../module';

class Profile extends StoreModule {
  initState() {
    return {
      data: {},
      wait: false,
    };
  }

  async load() {
    
    const token = this.getState().token || localStorage.getItem('token');

    this.setState({
      data: {},
      waiting: true,
    });

    const response = await fetch('api/v1/users/self?fields=*', {
      method: 'GET',
      headers: {
        'X-Token': token,
        'Content-type': 'application/json',
      },
    });
    console.log(response);
    const json = await response.json();
    console.log(json);

    this.setState(
      {
        data: json.result,
        wait: false,
      },
      'Загружен профиль из АПИ',
    );
  }
}

export default Profile;
