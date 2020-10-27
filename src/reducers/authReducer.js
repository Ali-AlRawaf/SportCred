import { PAYLOAD_TYPES } from "../controller/user";

const INITIAL_STATE = {
  currentUser: null,
};

export default (state = {}, action) => {
  switch(action.type){
    case PAYLOAD_TYPES.REGISTER_USER:
      return {
        ...state,
        currentUser: action.payload.user
      }

    case PAYLOAD_TYPES.LOGIN_USER:
      return {
        ...state,
        currentUser: action.payload.user
      }

    default:
      return state;
  }
}