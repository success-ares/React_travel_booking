import { createActions } from 'redux-actions';

const {
  addUser,
  addUserSucceed,
  addUserFailed

} = createActions({
  ADD_USER: (email , password , firstname , lastname , birthday ,phonenumber , city ,province ,
    country , postal) => ({email , password , firstname , lastname , birthday ,phonenumber , city ,province ,
      country , postal }),
  ADD_USER_SUCCEED: () => ({}),
  ADD_USER_FAILED: error => ({ error })
});

export {
  addUser,
  addUserFailed,
  addUserSucceed
};
