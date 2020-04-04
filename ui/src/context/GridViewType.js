import React, { Component } from 'react';
import PropTypes from 'prop-types';

const { Provider, Consumer } = React.createContext();

class GridViewTypeProvider extends Component {
  state = {
    gridView: true,
  };

  changeView = () => {
    this.setState(prevState => ({
      gridView: !prevState.gridView,
    }));
  };

  render() {
    const { children } = this.props;
    const { gridView } = this.state;

    return <Provider value={{ type: gridView, changeType: this.changeView }}>{children}</Provider>;
  }
}

GridViewTypeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { GridViewTypeProvider, Consumer };
