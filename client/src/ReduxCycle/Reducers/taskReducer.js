import { DELETE_TASK, GET_TASK, GET_TASKS } from "../actions/actionsTypes";

let initialState = {
  tasks: [],
  loading: true,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload.tasks,
        tasksCount: action.payload.todosCount,
        loading: false,
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
        loading: false,
      };

    case GET_TASK:
      return {
        ...state,
        task: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default taskReducer;
