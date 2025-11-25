import * as types from "../actions/taskTypes";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    // --- FETCH TASKS ---
    case types.TASK_FETCH_REQUEST:
      return { ...state, loading: true, error: null };

    case types.TASK_FETCH_SUCCESS:
      return { ...state, loading: false, items: action.payload };

    case types.TASK_FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // --- CREATE TASK ---
    case types.TASK_CREATE_REQUEST:
      return { ...state, loading: true, error: null };

    case types.TASK_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [action.payload, ...state.items],
      };

    case types.TASK_CREATE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // --- UPDATE STATUS ---
    case types.TASK_UPDATE_STATUS_REQUEST:
      return { ...state, loading: true, error: null };

    case types.TASK_UPDATE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.map((t) =>
          t._id === action.payload._id ? action.payload : t
        ),
      };

    case types.TASK_UPDATE_STATUS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // --- DELETE TASK ---
    case types.TASK_DELETE_REQUEST:
      return { ...state, loading: true, error: null };

    case types.TASK_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.filter((t) => t._id !== action.payload),
      };

    case types.TASK_DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
