import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { keyframes } from 'styled-components';
import truckImg from 'assets/img/truck.png';
import translations from 'translations/pl/truck.json';

const appear = keyframes`
  0%{
    opacity: 0;
    transform: translateY(50%);
  }
  
  100%{
    opacity: 0.99;
    transform: translateY(0);
  }
`;

const TruckImg = styled.img`
  margin-top: 2rem;
  width: 15rem;
  animation: ${appear} 1.3s ease-in-out;
`;

const Truck = ({ className }) => (
  <TruckImg className={className} src={truckImg} alt={translations.truckAlt} />
);

Truck.propTypes = {
  className: PropTypes.string,
};

Truck.defualtProps = {
  className: '',
};

export default Truck;
