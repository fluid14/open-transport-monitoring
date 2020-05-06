import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import UserMiniature from 'components/atoms/UserMiniature';
import ViewStyleSwitch from 'components/atoms/ViewStyleSwitch';

const TopBarWrap = styled.div`
  display: flex;
  justify-content: ${({ noSwitch }) => (noSwitch ? 'flex-end' : 'space-between')};
  align-items: center;
  width: 100%;
  padding: 2rem 2rem 2rem 3.7rem;
  color: ${({ theme }) => theme.colors.white};
  z-index: 1;

  ${({ vehicle }) =>
    vehicle &&
    `
    position: absolute;
    top: 0;
    right: 0;
    width: 33rem;
  `}
`;

const TopBar = ({ userName, noSwitch, vehicle }) => (
  <TopBarWrap noSwitch={noSwitch} vehicle={vehicle}>
    {!noSwitch && (
      <>
        <ViewStyleSwitch /> <UserMiniature userName={userName} />
      </>
    )}
    {noSwitch && <UserMiniature userName={userName} dark />}
  </TopBarWrap>
);

TopBar.propTypes = {
  userName: PropTypes.string.isRequired,
  noSwitch: PropTypes.bool,
  vehicle: PropTypes.bool,
};

TopBar.defaultProps = {
  noSwitch: false,
  vehicle: false,
};

export default TopBar;
