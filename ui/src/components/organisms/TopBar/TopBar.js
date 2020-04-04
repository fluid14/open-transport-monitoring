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
  padding: ${({ theme }) => theme.padding.wrap};
  color: ${({ theme }) => theme.colors.white};
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
