import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getUserPosition from 'components/organisms/Map/getUserPosition';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import mapMock from 'assets/img/map.png';
import config from 'config.json';
import vehicleMarker from './vehicleMarker';

const MapWrap = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 30vh;
  min-height: 100px;
  max-height: 90vh;
`;

const ResizeBars = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -40%);
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.purple};
  padding: 0.2rem 0.5rem;
  font-size: 1rem;
  border-radius: 8px;
  transition: 0.3s ease;
`;

const ResizeBar = styled.div`
  display: block;
  position: absolute;
  top: -5px;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: ${({ theme }) => theme.colors.purple};
  cursor: row-resize;
  z-index: 99;
  transition: 0.3s ease;
  &:hover {
    opacity: 0.3;
  }
`;

const MapGL = ReactMapboxGl({
  accessToken: config.mapboxApiKey,
});

class Map extends Component {
  state = {
    userPosition: {
      lat: '',
      lng: '',
    },
    isActive: false,
  };

  componentDidMount() {
    getUserPosition()
      .then(position => {
        this.setState({
          userPosition: {
            lat: position.lat,
            lng: position.lng,
          },
        });
      })
      .catch(err => console.log(err));
  }

  resizeBar = React.createRef();
  mapWrap = React.createRef();

  moveMap = e => {
    this.mapWrap.current.style.height = `${window.innerHeight - e.clientY - 5}px`;
  };

  resize = () => {
    document.addEventListener('mousemove', this.moveMap);
  };

  stopResize = () => {
    document.removeEventListener('mousemove', this.moveMap);
  };

  render() {
    const { className, nonBar, vehiclePosition, allVehicles } = this.props;
    const { userPosition } = this.state;
    return (
      <MapWrap ref={this.mapWrap} className={className}>
        {!nonBar && (
          <ResizeBar ref={this.resizeBar} onMouseDown={this.resize} onMouseUp={this.stopResize}>
            <ResizeBars>
              <FontAwesomeIcon icon={faGripLines} />
            </ResizeBars>
          </ResizeBar>
        )}
        <MapGL
          style="mapbox://styles/fluid14/ck6xzkds71nzm1ipnfq5k2puw"
          center={
            vehiclePosition.length === 1
              ? [vehiclePosition[0][1], vehiclePosition[0][0]]
              : [userPosition.lng, userPosition.lat]
          }
          zoom={[15]}
          containerStyle={{
            height: '100vh',
            width: '100%',
            background: `url(${mapMock}) center center / cover  no-repeat`,
          }}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ 'icon-image': 'truckMarker' }}
            images={vehicleMarker}
          >
            {vehiclePosition &&
              vehiclePosition.map(position => <Feature coordinates={[position[1], position[0]]} />)}
          </Layer>
        </MapGL>
        ;
      </MapWrap>
    );
  }
}

Map.propTypes = {
  className: PropTypes.string,
  nonBar: PropTypes.bool,
  vehiclePosition: PropTypes.array.isRequired,
  allVehicles: PropTypes.bool,
};

Map.defaultProps = {
  className: '',
  nonBar: false,
  allVehicles: false,
};

export default Map;
