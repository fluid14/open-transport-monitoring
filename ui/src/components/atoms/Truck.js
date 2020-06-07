import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import truckImg from 'assets/img/truck.svg';
import Vivus from 'vivus';

const truckAnim = keyframes`
  0%{
    transform: translateY(100%);
  }
  
  100%{
    transform: translateY(0);
  }
`;

const TruckImg = styled.div`
  margin-top: 2rem;
  width: 20rem;
  animation: 1s cubic-bezier(0.81, 1.09, 0.77, 0.96) 0.5s both ${truckAnim};
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
