import React from 'react';
import styled from 'styled-components';
import { GridViewTypeConsumer } from 'context/GridViewTypeContext';
import { faBars, faGripHorizontal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SwitchWrap = styled.a`
  font-size: 2rem;
  transition: 0.3s ease;
  cursor: pointer;
`;

const ViewStyleSwitch = () => (
  <GridViewTypeConsumer>
    {gridView => {
      return (
        <SwitchWrap onClick={gridView.changeType}>
          {gridView.type && <FontAwesomeIcon icon={faBars} />}
          {!gridView.type && <FontAwesomeIcon icon={faGripHorizontal} />}
        </SwitchWrap>
      );
    }}
  </GridViewTypeConsumer>
);

export default ViewStyleSwitch;
