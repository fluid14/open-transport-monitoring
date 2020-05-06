import React, { Component } from 'react';
import styled from 'styled-components/macro';
import StatsBar from 'components/organisms/StatsBar/StatsBar';
import ContentWrap from 'components/atoms/ContentWrap';
import TruckView from 'components/organisms/TruckView/TruckView';
import Map from 'components/organisms/Map/Map';
import ChangeView from 'components/atoms/ChangeView';

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
  };

  changeView = () => {
    this.setState(prevState => ({
      showMap: !prevState.showMap,
    }));
  };

  render() {
    const { showMap } = this.state;
    return (
      <>
        <StyledContentWrap showMap={showMap}>
          <VehicleMapWrap>
            <ChangeView onClick={this.changeView} showMap={showMap}>
              {!showMap && <p>Mapa</p>}
              {showMap && <p>Pojazd</p>}
            </ChangeView>
            {!showMap && <TruckView />}
            <StyledMap nonBar showMap={showMap} />
          </VehicleMapWrap>
          <StatsBar />
        </StyledContentWrap>
      </>
    );
  }
}
export default VehicleView;
