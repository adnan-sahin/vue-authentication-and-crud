import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
});

// instance.defaults.headers.common['TESTHEADER'] = 'TestHeaderValue';

export default instance;