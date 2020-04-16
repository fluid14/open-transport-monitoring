/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import styled from 'styled-components/macro';
import mapPlug from 'assets/img/map.png';
import mapInit from './mapInit';
import getUserPosition from './getUserPosition';

const MapWrap = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 30vh;
  min-height: 100px;
  max-height: 90vh;
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

const MapBox = styled.div`
  width: 100%;
  height: 100%;
  background: url(${mapPlug}) center center / cover no-repeat;
`;

class Map extends React.Component {
  state = {
    userPosition: {
      lat: '',
      lng: '',
    },
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
      .then(() => {
        const { userPosition } = this.state;
        mapInit(userPosition);
        // console.log(mapBox)
      })
      .catch(err => console.log(err));
  }

  resizeBar = React.createRef();
  mapWrap = React.createRef();

  moveMap = (e) => {
    this.mapWrap.current.style.height = `${window.innerHeight - e.clientY - 5}px`;
  };

  resize = () => {
    document.addEventListener('mousemove', this.moveMap)
  };

  stopResize = () => {
    document.removeEventListener('mousemove', this.moveMap);
  }

  render() {
    return (
      <>
        <MapWrap ref={this.mapWrap}>
          <ResizeBar ref={this.resizeBar} onMouseDown={this.resize} onMouseUp={this.stopResize} />
          <MapBox id="map" />
        </MapWrap>
      </>
    );
  }
}

export default Map;
