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
              const { VehicleID, Brand, Model, NumberPlate } = vehicle;
              return (
                <VehicleCard
                  key={VehicleID}
                  to={`/vehicle/${VehicleID}`}
                  brand={Brand}
                  model={Model}
                  locale="Warszawa"
                  workTime="6.5"
                  numberPlate={NumberPlate}
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
