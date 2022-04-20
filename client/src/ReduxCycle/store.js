import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./Reducers/authReducer";
import taskReducer from "./Reducers/taskReducer";
import errorsReducer from "./Reducers/errorsReducer";

const reducers = combineReducers({
  authReducer,
  errorsReducer,
  taskReducer,
});

const initialState = {};
const middleware = [thunk];

export const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
