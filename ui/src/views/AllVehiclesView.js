import React, { Component } from 'react';
import GridListTemplate from '../templates/GridListTemplate';
import VehicleCard from 'components/molecules/VehicleCard';
import dummyData from 'data/dummyDataVehicle.json';

class AllVehiclesView extends Component {
  render() {
    return (
      <GridListTemplate>
        <>
          {dummyData.map(vehicle => {
            const { id, brand, model, fuel, locale, registration, status } = vehicle;
            return (
              <VehicleCard
                key={id}
                to={`/vehicle/${id}`}
                brand={brand}
                model={model}
                locale={locale}
                fuel={fuel}
                registration={registration}
                status={status}
              />
            );
          })}
        </>
      </GridListTemplate>
    );
  }
}

export default AllVehiclesView;
