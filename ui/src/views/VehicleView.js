import React, { Component } from 'react';
import styled from 'styled-components/macro';
import StatsBar from 'components/organisms/StatsBar/StatsBar';
import ContentWrap from 'components/atoms/ContentWrap';
import TruckView from 'components/organisms/TruckView/TruckView';
import Map from 'components/organisms/Map/Map';
import ChangeView from 'components/atoms/ChangeView';
import SINGLE_VEHICLE from 'graphql/queries/singleVehicle';
import { Query } from 'react-apollo';
import Preloader from 'components/molecules/Preloader';
import translations from 'translations/pl/singleVehicle.json';

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

  render() {
    const { showMap, vehicleId } = this.state;
    return (
      <>
        <StyledContentWrap showMap={showMap}>
          <Query query={SINGLE_VEHICLE} variables={{ vehicleId }}>
            {({ loading, error, data }) => {
              {
                if (loading) return <Preloader loading={loading} />;
                if (error) {
                  console.log(error.message);
                }
                if (data) {
                  const { brand, model, numberPlate } = data.singleVehicle;
                  return (
                    <>
                      <VehicleMapWrap>
                        <ChangeView onClick={this.changeView} showMap={showMap}>
                          {!showMap && <p>{translations.map}</p>}
                          {showMap && <p>{translations.vehicle}</p>}
                        </ChangeView>
                        <TruckView brand={brand} model={model} plateNumber={numberPlate} />
                        <StyledMap nonBar showMap={showMap} />
                      </VehicleMapWrap>
                      <StatsBar vehicleId={vehicleId} data={data} />
                    </>
                  );
                }
              }
            }}
          </Query>
        </StyledContentWrap>
      </>
    );
  }
}

export default VehicleView;
