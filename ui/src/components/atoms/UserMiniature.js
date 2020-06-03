import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import userMiniature from 'assets/img/userMiniature.png';

const UserMiniatureImg = styled.div`
  width: 3.4rem;
  height: 3.4rem;
  border: 1px solid black;
  border-radius: 50%;
  background: url(${userMiniature}) center center / cover no-repeat;
`;

const UserName = styled.p`
  font-size: 1.6rem;
  margin: 0 1rem 0 0;
  font-weight: 600;
  color: ${({ dark }) => (dark ? '#000000' : '#ffffff')};
`;

const UserWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const UserMiniature = ({ userName, dark }) => (
  <UserWrap>
    <UserName dark={dark}>{userName}</UserName>
    <UserMiniatureImg />
  </UserWrap>
);

UserMiniature.propTypes = {
  userName: PropTypes.string.isRequired,
  dark: PropTypes.bool,
};

UserMiniature.defaultProp = {
  userName: 'Jan Nowak',
  dark: false,
};

export default UserMiniature;
