import React from 'react';
import GridListTemplate from '../templates/GridListTemplate';
import AllVehiclesTemplate from 'templates/AllVehiclesTemplate';
import VehicleCard from 'components/molecules/VehicleCard';
import { Query } from 'react-apollo';
import ALL_VEHICLES from 'graphql/queries/allVehicles';
import Preloader from 'components/molecules/Preloader';

const AllVehiclesView = () => (
  <AllVehiclesTemplate>
    <GridListTemplate>
      <Query query={ALL_VEHICLES} fetchPolicy={'network-only'}>
        {({ loading, error, data }) => {
          {
            if (loading) return <Preloader loading={loading} />;
            if (error) {
              console.log(error.message);
            }
            return data.allVehicles.map(vehicle => {
              const { vehicleId, brand, model, numberPlate } = vehicle;
              return (
                <VehicleCard
                  key={vehicleId}
                  to={`/vehicle/${vehicleId}`}
                  brand={brand}
                  model={model}
                  locale="Warszawa"
                  workTime="6.5"
                  numberPlate={numberPlate}
                  status={true}
                />
              );
            });
          }
        }}
      </Query>
    </GridListTemplate>
  </AllVehiclesTemplate>
);

export default AllVehiclesView;
