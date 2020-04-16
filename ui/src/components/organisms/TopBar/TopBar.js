import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import UserMiniature from 'components/atoms/UserMiniature';
import ViewStyleSwitch from 'components/atoms/ViewStyleSwitch';

const TopBarWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 2rem 2rem 2rem 3.7rem;
  color: ${({ theme }) => theme.colors.white};
  z-index: 1;
`;

const TopBar = ({ userName }) => (
  <TopBarWrap>
    <ViewStyleSwitch />
    <UserMiniature userName={userName} />
  </TopBarWrap>
);

TopBar.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default TopBar;
