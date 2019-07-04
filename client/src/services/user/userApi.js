import { wrapRequest, xapi } from '../utils';
//don't know how to send addUser 's paramaters. params? or data?
const addUser = wrapRequest(async (email , password , firstname , lastname , birthday ,phonenumber , city ,province ,
  country , postal) =>
  xapi().post('/singup', { email , password , firstname , lastname , birthday ,phonenumber , city ,province ,
    country , postal })
);

export {
  addUser  
};
