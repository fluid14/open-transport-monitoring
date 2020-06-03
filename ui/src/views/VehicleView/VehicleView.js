import React, { Component } from 'react';
import styled from 'styled-components';
import StatsBar from 'components/organisms/StatsBar/StatsBar';
import ContentWrap from 'components/atoms/ContentWrap';
import TruckView from 'components/organisms/TruckView/TruckView';
import Map from 'components/organisms/Map/Map';
import ChangeView from 'components/atoms/ChangeView';
import { Query, Subscription } from 'react-apollo';
import Preloader from 'components/molecules/Preloader';
import translations from 'translations/pl/singleVehicle.json';
import DEVICE_MESSAGE from 'graphql/subscription/deviceMessage';
import SINGLE_VEHICLE_AND_PARAMETER_LIMITS from 'graphql/queries/singleVehicleAndParameterLimits';
import ErrorPopUp from 'components/molecules/ErrorPopUp';
import messageMapper from 'views/VehicleView/messageMapper';

const StyledContentWrap = styled(ContentWrap)`
  width: 100%;
  height: 100%;
  padding: 0;
`;

const VehicleMapWrap = styled.div`
  position: relative;
  width: calc(100% - 33rem);
  height: 100%;
`;

const StyledMap = styled(Map)`
  position: absolute;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  transition: 0.3s ease;

  ${({ showMap }) =>
    !showMap &&
    `
    opacity: 0;
    z-index: -1;
  `}
`;

class VehicleView extends Component {
  state = {
    showMap: true,
    vehicleId: '',
  };

  componentDidMount() {
    this.setState({
      vehicleId: this.props.match.params.id,
    });
  }

  changeView = () => {
    this.setState(prevState => ({
      showMap: !prevState.showMap,
    }));
  };

  parameterLimitsConvert = vehicleParameterLimits => {
    return vehicleParameterLimits.reduce((obj, item) => {
      return {
        ...obj,
        [item.name]: item,
      };
    }, {});
  };

  render() {
    const { showMap, vehicleId } = this.state;
    return (
      <StyledContentWrap showMap={showMap}>
        <Query query={SINGLE_VEHICLE_AND_PARAMETER_LIMITS} variables={{ vehicleId }}>
          {({ loading, error, data, refetch }) => {
            {
              if (loading) return <Preloader loading={loading} />;
              if (error) {
                console.log(error.message);
                return <ErrorPopUp onClick={refetch} />;
              }
              if (data) {
                const {
                  singleVehicle,
                  singleVehicle: { brand, model, numberPlate, deviceId },
                  vehicleParameterLimits,
                } = data;
                const parameterLimits = this.parameterLimitsConvert(vehicleParameterLimits);
                return (
                  <Subscription subscription={DEVICE_MESSAGE} variables={{ deviceId }}>
                    {({ data, loading }) => {
                      if (loading) return <Preloader loading={loading} />;
                      if (data) {
                        const { statsForTruck, statsForBar, errors, position } = messageMapper(
                          data.deviceMessage,
                        );
                        return (
                          <>
                            <VehicleMapWrap>
                              <ChangeView onClick={this.changeView} showMap={showMap}>
                                {!showMap && <p>{translations.map}</p>}
                                {showMap && <p>{translations.vehicle}</p>}
                              </ChangeView>
                              <TruckView
                                brand={brand}
                                model={model}
                                plateNumber={numberPlate}
                                stats={statsForTruck}
                                parameterLimits={parameterLimits}
                              />
                              <StyledMap nonBar showMap={showMap} vehiclePosition={position} />
                            </VehicleMapWrap>
                            <StatsBar
                              vehicleId={vehicleId}
                              singleVehicle={singleVehicle}
                              errors={errors}
                              stats={statsForBar}
                            />
                            ;
                          </>
                        );
                      }
                    }}
                  </Subscription>
                );
              }
            }
          }}
        </Query>
      </StyledContentWrap>
    );
  }
}

export default VehicleView;
