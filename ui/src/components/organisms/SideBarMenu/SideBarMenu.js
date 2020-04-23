import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import Logo from 'components/atoms/Logo';
import logoutIco from 'assets/img/icons/logout.png';
import translations from 'translations/pl/sideBarMenu.json';
import { NavLink } from 'react-router-dom';
import { routes } from 'routes/routes';

const SideBarMenuWrap = styled.div`
  height: 100vh;
  width: 18.9rem;
  background-color: ${({ theme }) => theme.colors.purpleDark};
  box-shadow: 0.5px 0 10px black;
  padding: ${({ theme }) => theme.padding.wrap};
  transition: 0.3s ease;
  display: block;
  overflow: hidden;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 81px;
`;

const ListItem = styled.li`
  position: relative;
  margin-bottom: 2rem;
`;

const MenuLink = styled.a`
  position: relative;
  font-size: 1.4rem;
  line-height: 1.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  opacity: ${({ isNewVehicleBarActive }) => (isNewVehicleBarActive === true ? '0.9' : '0.5')};
  transition: 0.3s ease;

  &.active {
    opacity: 0.9;
  }

  &:hover {
    opacity: 0.9;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${({ isNewVehicleBarActive }) => (isNewVehicleBarActive === true ? '20px' : '0')};
    height: 1px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.white};
    transition: 0.3s ease;
  }

  &.active::after {
    width: 20px;
  }

  &:hover::after {
    width: 100%;
  }
`;

const LogOutBtn = styled.a`
  display: block;
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  width: 25px;
  height: 25px;
  background: url(${logoutIco}) center center / cover no-repeat;
  cursor: pointer;
`;

const SideBarMenu = ({ showNewVehicleBar, isNewVehicleBarActive }) => (
  <SideBarMenuWrap>
    <Logo />
    <List>
      <ListItem>
        <MenuLink as={NavLink} to={routes.allVehicles} activeClassName="active">
          {translations.all_vehicles}
        </MenuLink>
      </ListItem>
      <ListItem>
        <MenuLink onClick={() => showNewVehicleBar()} isNewVehicleBarActive={isNewVehicleBarActive}>
          {translations.add_vehicle}
        </MenuLink>
      </ListItem>
    </List>
    <LogOutBtn />
  </SideBarMenuWrap>
);

SideBarMenu.propTypes = {
  showNewVehicleBar: PropTypes.func.isRequired,
  isNewVehicleBarActive: PropTypes.bool.isRequired,
};

export default SideBarMenu;
