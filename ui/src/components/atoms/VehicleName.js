import React from "react";
import PropTypes from 'prop-types';
import styled from "styled-components/macro";

const VehicleNameWrap = styled.div`
  width: 100%;
  color: ${({theme}) => theme.colors.white};
  font-weight: 900;
  text-transform: uppercase;
`;

const Model = styled.span`
  font-weight: 500;
`;

const VehicleName = ({mark, model}) => (
    <VehicleNameWrap>
        <h2>{mark} <Model>{model}</Model></h2>
    </VehicleNameWrap>
)

VehicleName.propTypes = {
    mark: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired
}

export default VehicleName;