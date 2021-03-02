import config from './config';

export default class Utils {

  // function to send request and get response
  createUser = async (user: Object) => {
    const response = await fetch( config.apiBaseUrl + '/users', user);

    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  };

  // function to send request and get response
  getUser = async (user: Object) => {
    const response = await fetch( config.apiBaseUrl + '/users', user);

    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  };

}