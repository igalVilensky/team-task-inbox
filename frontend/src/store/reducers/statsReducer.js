import * as types from "../actions/statsTypes";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export default function statsReducer(state = initialState, action) {
  switch (action.type) {
    case types.STATS_FETCH_REQUEST:
      return { ...state, loading: true, error: null };

    case types.STATS_FETCH_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case types.STATS_FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
