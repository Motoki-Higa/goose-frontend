import config from './config';

export default class Utils {

  api = (path: string, method: string, body: object | null, requiresAuth?: boolean, credentials?: any) => {
    const url = config.apiBaseUrl + path;

    interface IOptions {
      method: string;
      headers: {[key: string]: string};
      body?: string;
    }

    const options: IOptions = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // if auth is required, add authorization header to the option
    if (requiresAuth) {
      // creates a Base64-encoded ASCII string
      const encodedCredentials = btoa(`${ credentials.email }:${ credentials.password }`);

      // Add authorization header to the request
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  // function to send request and get response
  createUser = async (user: Object) => {
    // Use api() helper method to request and gets response
    const response = await this.api(`/users`, 'POST', user);

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
  getUser = async (email: string, password: string) => {
    // Use api() helper method to request and gets response
    const response = await this.api(`/users`, 'GET', null, true, { email, password });

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