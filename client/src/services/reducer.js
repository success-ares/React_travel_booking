import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

/** Import service reducers */
import authReducer from './auth/authReducer';
import userReducer from './user/userReducer';


// Import modal reducers
import modalReducer from '../modals/modalConductorReducer';

const servicesReducer = combineReducers({
  auth: authReducer,
  user: userReducer
});

export default combineReducers({
  routing: routerReducer,
  services: servicesReducer,
  modal: modalReducer
});
