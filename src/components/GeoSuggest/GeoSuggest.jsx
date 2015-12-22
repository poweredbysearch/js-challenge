import React, { PropTypes, Component } from 'react';
// import ReactDOM from 'react-dom';
import GeoSuggestItem from './GeoSuggestItem.jsx';

// Some extra styles
import './GeoSuggest.css';

const noop = () => {};

class GeoSuggest extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    onInputChange: PropTypes.func,
    onSuggestSelect: PropTypes.func,
    placeholder: PropTypes.string,
    predictions: PropTypes.array,
    value: PropTypes.string
  };

  static defaultProps = {
    onChange: noop,
    onInputChange: noop,
    onSuggestSelect: noop,
    placeholder: 'Search for a location',
    predictions: [],
    value: ''
  };

  state = {
    activeSuggest: null,
    suggestsHidden: true
  };

  /**
   * When a key gets pressed in the input
   * @param  {Event} event The keypress event
   */
  handleInputKeyDown = (event) => {
    switch (event.which) {
      case 40: // DOWN
        event.preventDefault();
        this.activateSuggest('next');
        break;
      case 38: // UP
        event.preventDefault();
        this.activateSuggest('prev');
        break;
      case 13: // ENTER
        this.handleSuggestSelect(this.state.activeSuggest);
        break;
      case 9: // TAB
        this.handleSuggestSelect(this.state.activeSuggest);
        break;
      case 27: // ESC
        this.hideSuggests();
        break;
      default:
        break;
    }
  }

  handleInputChange = () => {
    this.props.onInputChange(this.refs.geosuggestInput.value);
  }

  handleSuggestSelect = (suggest) => {
    this.setState({
      activeSuggest: suggest
    }, () => {
      this.props.onSuggestSelect(suggest);
    });
  }

  /**
   * When the input gets focused
   */
  showSuggests = () => {
    if (this.props.predictions) {
     this.setState({suggestsHidden: false});
    }
  }

  /**
   * When the input loses focused
   */
  hideSuggests = () => {
    setTimeout(() => {
      this.setState({suggestsHidden: true});
    }, 100);
  }

  /**
   * Activate a new suggest
   * @param {String} direction The direction in which to activate new suggest
   */
  activateSuggest = (direction) => {
    if (this.state.suggestsHidden) {
      this.showSuggests();
      return;
    }

    var suggestsCount = this.props.predictions.length - 1,
      next = direction === 'next',
      newActiveSuggest = null,
      newIndex = 0,
      i = 0;

    for (i; i <= suggestsCount; i++) {
      if (this.props.predictions[i] === this.state.activeSuggest) {
        newIndex = next ? i + 1 : i - 1;
      }
    }

    if (!this.state.activeSuggest) {
      newIndex = next ? 0 : suggestsCount;
    }

    if (newIndex >= 0 && newIndex <= suggestsCount) {
      newActiveSuggest = this.props.predictions[newIndex];
    }

    this.setState({activeSuggest: newActiveSuggest});
  }

  /**
   * The classes for the suggests list
   * @return {String} The classes
   */
  getSuggestsClasses () {
    var classes = 'geosuggest__suggestions';

    classes += this.state.suggestsHidden ?
      ' geosuggest__suggestions--hidden' : '';

    return classes;
  }

  render () {
    const { predictions, placeholder, value } = this.props;

    return (
      <div
        className='geosuggest'
        onClick={this.onClick}
      >
        <input
          className="form-control geosuggest__input"
          ref="geosuggestInput"
          type="text"
          value={value}
          placeholder={placeholder}
          onKeyDown={this.handleInputKeyDown}
          onChange={this.handleInputChange}
          onFocus={this.showSuggests}
          onBlur={this.hideSuggests}
        />
        <ul className={this.getSuggestsClasses()}>
          {predictions && predictions.map((prediction) => {
            const active = this.state.activeSuggest && prediction.place_id === this.state.activeSuggest.place_id;

            return (
              <GeoSuggestItem
                key={prediction.place_id}
                suggest={prediction}
                active={active}
                onSuggestSelect={this.handleSuggestSelect}
              />
            );
          })}
        </ul>
      </div>
    );
  }

}

export default GeoSuggest;
