import React, { PropTypes, Component } from 'react';

class GeoSuggestItem extends Component {

  static propTypes = {
    active: PropTypes.bool,
    onSuggestSelect: PropTypes.func,
    suggest: PropTypes.object
  };

  static defaultProps = {
    active: false,
    suggest: {
      label: ''
    },
    onSuggestSelect () {}
  };

  /**
   * When the element gets clicked
   * @param  {Event} event The click event
   */
  onClick = (event) => {
    this.props.onSuggestSelect(this.props.suggest);
  }

  /**
   * The classes for the suggest item
   * @return {String} The classes
   */
  getSuggestClasses () {
    let classes = 'geosuggest__suggestion';

    classes += this.props.active ? ' geosuggest__suggestion--active' : '';

    return classes;
  }

  /**
   * Render the view
   * @return {Function} The React element to render
   */
  render () {
    return (// eslint-disable-line no-extra-parens
      <li
        className={this.getSuggestClasses()}
        onMouseDown={this.onClick}
      >
          {this.props.suggest.description}
      </li>
    );
  }

}

export default GeoSuggestItem;
