import React from 'react';
import styled from 'styled-components/macro';
import gridIco from 'assets/img/icons/grid.svg';
import listIco from 'assets/img/icons/list.svg';
import { Consumer } from 'context/GridViewType';

const SwitchWrap = styled.a`
  display: flex;
  width: 25px;
  height: 25px;
  border: none;
  background: url(${({ gridView }) => (gridView ? listIco : gridIco)}) center center / cover
    no-repeat;
  transition: 0.3s ease;
`;

const ViewStyleSwitch = () => (
  <Consumer>
    {gridType => <SwitchWrap onClick={gridType.changeType} gridView={gridType.type} />}
  </Consumer>
);

export default ViewStyleSwitch;
