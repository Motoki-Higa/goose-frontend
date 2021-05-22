let api = '';
if (process.env.NODE_ENV === "production"){
  api = 'https://goose-backend.herokuapp.com/api';
} else {
  api = 'http://localhost:5000/api';
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  apiBaseUrl: api,
};