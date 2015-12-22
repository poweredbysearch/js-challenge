import {
  SELECT_PLACE,
  QUERY_PLACE_DETAILS,
  QUERY_PLACE_DETAILS_SUCCESS,
  QUERY_PLACE_DETAILS_FAIL,
  QUERY_PLACES,
  QUERY_PLACES_SUCCESS,
  QUERY_PLACES_FAIL
} from '../actionTypes';

const initialState = {
  error: null,
  details: null,
  loading: false,
  predictions: [],
  query: '',
  selected: null
};

export default function places (state = initialState, action = {}) {

  switch (action.type) {

    case SELECT_PLACE:
      return {
        ...state,
        query: action.selection.description,
        selected: action.selection
      };

    case QUERY_PLACE_DETAILS:
      return {
        ...state,
        loading: true
      };

    case QUERY_PLACE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        details: action.result
      };

    case QUERY_PLACE_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case QUERY_PLACES:
      return {
        ...state,
        query: action.query,
        loading: true
      };

    case QUERY_PLACES_SUCCESS:
      return {
        ...state,
        loading: false,
        predictions: action.result
      };

    case QUERY_PLACES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

      default:
        return state;

  }

}
