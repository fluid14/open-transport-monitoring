import React, { Component } from 'react';
import GridListTemplate from '../templates/GridListTemplate';
import AllVehiclesTemplate from 'templates/AllVehiclesTemplate';
import VehicleCard from 'components/molecules/VehicleCard';
import dummyData from 'data/dummyDataVehicle.json';

class AllVehiclesView extends Component {
  render() {
    return (
      <AllVehiclesTemplate>
        <GridListTemplate>
          <>
            {dummyData.map(vehicle => {
              const { id, brand, model, workTime, locale, registration, status } = vehicle;
              return (
                <VehicleCard
                  key={id}
                  to={`/vehicle/${id}`}
                  brand={brand}
                  model={model}
                  locale={locale}
                  workTime={workTime}
                  registration={registration}
                  status={status}
                />
              );
            })}
          </>
        </GridListTemplate>
      </AllVehiclesTemplate>
    );
  }
}

export default AllVehiclesView;
