import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import UserMiniature from 'components/atoms/UserMiniature';
import ViewStyleSwitch from 'components/atoms/ViewStyleSwitch';
import { Auth } from 'aws-amplify';

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

class TopBar extends Component {
  state = {
    username: '',
  };
  componentDidMount() {
    Auth.currentUserInfo()
      .then(result => {
        const username = result.username[0].toUpperCase() + result.username.substring(1);
        this.setState({
          username: username,
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { noSwitch, vehicle } = this.props;
    const { username } = this.state;
    return (
      <TopBarWrap noSwitch={noSwitch} vehicle={vehicle}>
        {!noSwitch && (
          <>
            <ViewStyleSwitch /> <UserMiniature userName={username} />
          </>
        )}
        {noSwitch && <UserMiniature userName={username} dark />}
      </TopBarWrap>
    );
  }
}

TopBar.propTypes = {
  noSwitch: PropTypes.bool,
  vehicle: PropTypes.bool,
};

TopBar.defaultProps = {
  noSwitch: false,
  vehicle: false,
};

export default TopBar;
