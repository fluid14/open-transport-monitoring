import React, { Component } from 'react';
import GridListTemplate from 'templates/GridListTemplate';
import VehicleCard from 'components/molecules/VehicleCard';
import { Query } from 'react-apollo';
import ALL_VEHICLES from 'graphql/queries/allVehicles';
import Preloader from 'components/molecules/Preloader';
import TopBar from 'components/organisms/TopBar/TopBar';
import ContentWrap from 'components/atoms/ContentWrap';
import Map from 'components/organisms/Map/Map';
import getDevicesLastMessage from 'views/AllVehiclesView/getDevicesLastMessage';

class AllVehiclesView extends Component {
  state = {
    devicesLastMessage: [],
    vehiclesPosition: [],
  };

  componentDidMount() {
    getDevicesLastMessage(this.setLastMessage);
  }

  setLastMessage = (devicesLastMessage, vehiclesPosition) => {
    this.setState({
      devicesLastMessage: devicesLastMessage,
      vehiclesPosition: vehiclesPosition,
    });
  };

  render() {
    const { vehiclesPosition } = this.state;
    return (
      <>
        <TopBar userName="Jan Nowak" />
        <ContentWrap>
          <GridListTemplate>
            <Query query={ALL_VEHICLES} fetchPolicy={'network-only'}>
              {({ loading, error, data }) => {
                {
                  if (loading) return <Preloader loading={loading} />;
                  if (error) {
                    console.log(error.message);
                  }
                  if (data) {
                    const { devicesLastMessage } = this.state;
                    return data.allVehicles.map(vehicle => {
                      const { vehicleId, brand, model, numberPlate, deviceId } = vehicle;
                      const deviceMessage = devicesLastMessage.filter(
                        device => device.deviceName === deviceId,
                      );
                      const { message } = deviceMessage[0];
                      return (
                        <VehicleCard
                          key={vehicleId}
                          to={`/vehicle/${vehicleId}`}
                          brand={brand}
                          model={model}
                          numberPlate={numberPlate}
                          deviceMessage={message}
                        />
                      );
                    });
                  }
                }
              }}
            </Query>
          </GridListTemplate>
        </ContentWrap>
        <Map vehiclePosition={vehiclesPosition} allVehicles />
      </>
    );
  }
}

export default AllVehiclesView;
