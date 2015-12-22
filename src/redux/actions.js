import * as ActionTypes from './actionTypes';

const googleMaps = window.google && window.google.maps;
const autocompleteService = new googleMaps.places.AutocompleteService();
const placesService = new googleMaps.places.PlacesService(document.querySelector('#attrs'));
// const geocoder = new googleMaps.Geocoder();

export function loadPlace (placeId) {

  return {
    types: [
      ActionTypes.QUERY_PLACE_DETAILS,
      ActionTypes.QUERY_PLACE_DETAILS_SUCCESS,
      ActionTypes.QUERY_PLACE_DETAILS_FAIL
    ],
    promise () {
      return new Promise(resolve => {
        placesService.getDetails({ placeId }, data => {
          resolve(data);
        });
      });
    }
  };
}

export function autocompleteSelect (selection) {

  return function (dispatch, getState, reducer, next) {
    dispatch(loadPlace(selection.place_id));

    return next({
      type: ActionTypes.SELECT_PLACE,
      selection: selection
    });
  };
}

export function autocompleteSearch (query) {

  return {
    types: [
      ActionTypes.QUERY_PLACES,
      ActionTypes.QUERY_PLACES_SUCCESS,
      ActionTypes.QUERY_PLACES_FAIL
    ],
    query: query,
    promise () {

      const options = {
        input: query,
        location: new googleMaps.LatLng(43.653226, -79.3831843),
        radius: 0,
        types: [
          'establishment',
          'geocode'
        ],
        bounds: null,
        componentRestrictions: {
          country: 'ca'
        }
      };

      return new Promise(resolve => {
        autocompleteService.getPlacePredictions(options, predictions => {
          resolve(predictions);
        });
      });
    }
  };
}
