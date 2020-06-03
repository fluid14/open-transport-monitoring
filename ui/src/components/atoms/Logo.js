import React from 'react';
import styled from 'styled-components';
import logo from 'assets/img/logo.png';

const LogoWrap = styled.img`
  display: block;
  width: 90%;
`;

const Logo = () => <LogoWrap src={logo} />;

export default Logo;
