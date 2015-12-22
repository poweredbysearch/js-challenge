import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
  autocompleteSearch,
  autocompleteSelect
} from './redux/actions';
import { GeoSuggest } from './components/GeoSuggest';

class App extends Component {

  static propTypes = {
    details: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    predictions: PropTypes.array,
    query: PropTypes.string
  }

  render () {
    const { dispatch, predictions, query, details } = this.props;

    return (
      <div className="container">
        <h1>JS Challenge</h1>

        <hr/>

        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <GeoSuggest
              value={query}
              predictions={predictions}
              onInputChange={value => dispatch(autocompleteSearch(value))}
              onSuggestSelect={suggest => dispatch(autocompleteSelect(suggest))}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            {details ? JSON.stringify(details) : null}
          </div>
        </div>
      </div>
    );
  }
}

function select (state) {
  return {
    details: state.places.details,
    predictions: state.places.predictions,
    query: state.places.query
  };
}

export default connect(select)(App);
