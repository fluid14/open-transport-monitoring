import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const VehicleNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 900;
  text-transform: uppercase;
`;

const NameWrap = styled.h2`
  position: relative;
  display: inline-block;
`;

const Model = styled.span`
  position: relative;
  font-weight: 500;
  &::after {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    position: absolute;
    top: 0;
    right: -1.8rem;
    transform: translateY(50%);
    background-color: ${({ theme, status }) =>
      status ? theme.colors.status.enable : theme.colors.status.disable};
    border-radius: 100%;
  }
`;

const PlateNumber = styled.p`
  font-weight: 400;
`;

const VehicleName = ({ brand, model, plateNumber, status }) => (
  <VehicleNameWrap>
    <NameWrap>
      {brand} <Model status={status}>{model}</Model>
    </NameWrap>
    <PlateNumber>{plateNumber}</PlateNumber>
  </VehicleNameWrap>
);

VehicleName.propTypes = {
  brand: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  plateNumber: PropTypes.string.isRequired,
  status: PropTypes.bool,
};

VehicleName.propTypes = {
  status: false,
};

export default VehicleName;
