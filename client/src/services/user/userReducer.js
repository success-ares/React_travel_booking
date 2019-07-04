import { handleActions } from 'redux-actions';

import {
  addUser,
  addUserFailed,
  addUserSucceed,
} from './userActions';

const defaultState = {
  error: null,
  loading: false,
  message: '',
  success: false,
};

const reducer = handleActions({
  [addUser](state) {
    return {
      ...state,
      loading: true,
      success: false,
      message: 'Adding User...',
      error: null
    }
  },
  [addUserSucceed](state) {
    return {
      ...state,
      loading: false,
      success: true,
      message: 'User added successfully',
      error: null
    }
  },
  [addUserFailed](state, { payload: { error } }) {
    return {
      ...state,
      loading: false,
      success: false,
      error
    }
  }
}, defaultState);

export default reducer;