import React from 'react';
import styled from 'styled-components/macro';
import VehicleCard from 'components/molecules/VehicleCard';
import { Consumer } from 'context/GridViewType';

const GridWrap = styled.div`
  display: grid;
  grid-template-columns: ${({ viewStyle }) => (viewStyle ? 'repeat(4, 1fr)' : '1fr')};
  grid-gap: 30px 42px;
  padding-bottom: 32vh;
  transition: 0.3s ease;
`;

const GridListTemplate = () => (
  <>
    <Consumer>
      {gridView => (
        <GridWrap viewStyle={gridView.type}>
          <VehicleCard
            cardStyle={gridView.type}
            brand="Ford"
            model="F-Max"
            registration="Pz12345"
            status
          />
          <VehicleCard
            cardStyle={gridView.type}
            brand="Ford"
            model="F-Max"
            registration="Pz12345"
          />
          <VehicleCard
            cardStyle={gridView.type}
            brand="Ford"
            model="F-Max"
            registration="Pz12345"
            status
          />
          <VehicleCard
            cardStyle={gridView.type}
            brand="Ford"
            model="F-Max"
            registration="Pz12345"
            status
          />
          <VehicleCard
            cardStyle={gridView.type}
            brand="Ford"
            model="F-Max"
            registration="Pz12345"
            status
          />
          <VehicleCard
            cardStyle={gridView.type}
            brand="Ford"
            model="F-Max"
            registration="Pz12345"
            status
          />
          <VehicleCard
            cardStyle={gridView.type}
            brand="Ford"
            model="F-Max"
            registration="Pz12345"
            status
          />
          <VehicleCard
            cardStyle={gridView.type}
            brand="Ford"
            model="F-Max"
            registration="Pz12345"
            status
          />
          <VehicleCard
            cardStyle={gridView.type}
            brand="Ford"
            model="F-Max"
            registration="Pz12345"
            status
          />
        </GridWrap>
      )}
    </Consumer>
  </>
);

export default GridListTemplate;
