import { wrapRequest, xapi } from '../utils';
// import { oAuth2 } from 'config/settings';

const login = wrapRequest(async (email, password) =>
  xapi().post('/login', {
    // ...oAuth2,
    email,
    password
  })
);

const getUser = wrapRequest(async () => xapi().get('/api/user'));

export { login, getUser };
