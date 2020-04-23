import React from 'react';
import styled from 'styled-components/macro';
import VehicleName from 'components/atoms/VehicleName';
import Truck from 'components/atoms/Truck';
import VehicleStats from 'components/atoms/VehicleStats';

const VehicleWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const VehicleView = () => (
  <>
    <VehicleName model="F-Max" mark="Ford" />
    <VehicleWrap>
      <VehicleStats />
      <Truck />
    </VehicleWrap>
  </>
);

export default VehicleView;
