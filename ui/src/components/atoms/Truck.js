import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import truckImg from 'assets/img/truck.svg';
import Vivus from 'vivus';

const TruckImg = styled.div`
  margin-top: 2rem;
  width: 20rem;
`;

class Truck extends Component {
  truckRef = createRef();

  componentDidMount() {
    new Vivus(
      this.truckRef.current,
      { duration: 500, file: truckImg, animTimingFunction: Vivus.EASE },
      null,
    );
  }

  render() {
    const { className } = this.props;
    return <TruckImg ref={this.truckRef} className={className} />;
  }
}

Truck.propTypes = {
  className: PropTypes.string,
};

Truck.defualtProps = {
  className: '',
};

export default Truck;
