import { put, takeEvery, call, all } from 'redux-saga/effects';

// Import Actions
import {
  addUserSucceed,
  addUserFailed,
} from './userActions';

// Import API
import * as userApi from './userApi';


export function* userSubscriber() {
    yield all([takeEvery('ADD_USER', addUser)]);
  }

export function* addUser({payload: {email , password , firstname , lastname , birthday ,phonenumber , city ,province ,
  country , postal}}) {
  try {
    yield call(userApi.addUser, email , password , firstname , lastname , birthday ,phonenumber , city ,province ,
      country , postal);
      
    yield put(addUserSucceed());
// success next how to redirect home? 

  } catch (error) {
    console.error(error);
    yield put(addUserFailed(error));
  }
}
