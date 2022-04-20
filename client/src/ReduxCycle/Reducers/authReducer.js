import isEmpty from "../../utitlis/isEmpty";
import { SET_CURRENT_USER } from "../actions/actionsTypes";

let initialState = {
  user: {},
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
