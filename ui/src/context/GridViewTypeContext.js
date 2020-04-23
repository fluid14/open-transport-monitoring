import React, { Component } from 'react';
import PropTypes from 'prop-types';

const GridViewTypeContext = React.createContext();

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

    return (
      <GridViewTypeContext.Provider value={{ type: gridView, changeType: this.changeView }}>
        {children}
      </GridViewTypeContext.Provider>
    );
  }
}

GridViewTypeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

const GridViewTypeConsumer = ({ children }) => (
  <GridViewTypeContext.Consumer>{children}</GridViewTypeContext.Consumer>
);

GridViewTypeConsumer.propTypes = {
  children: PropTypes.element.isRequired,
};

export { GridViewTypeProvider, GridViewTypeConsumer };
