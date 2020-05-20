import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GlobalStyle from 'theme/GlobalStyle';
import theme from 'theme/theme';
import styled, { ThemeProvider } from 'styled-components';
import SideBarMenu from 'components/organisms/SideBarMenu/SideBarMenu';
import NewVehicleBar from 'components/organisms/NewVehicleBar/NewVehicleBar';
import { GridViewTypeProvider } from 'context/GridViewTypeContext';
import VehicleForm from 'components/molecules/VehicleForm';

const GlobalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
`;

const ViewWrapper = styled.div`
  position: relative;
  width: 100%;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

class GlobalTemplate extends Component {
  state = {
    isNewVehicleBarVisible: false,
  };

  toggleNewVehicleBar = () => {
    this.setState(prevState => ({
      isNewVehicleBarVisible: !prevState.isNewVehicleBarVisible,
    }));
  };

  render() {
    const { children } = this.props;
    const { isNewVehicleBarVisible } = this.state;

    return (
      <>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <GlobalWrapper>
            <SideBarMenu
              toggleBar={this.toggleNewVehicleBar}
              isNewVehicleBarActive={isNewVehicleBarVisible}
            />
            <NewVehicleBar
              isVisible={isNewVehicleBarVisible}
              toggleBar={this.toggleNewVehicleBar}
              form={VehicleForm}
            />
            <ViewWrapper>
              <GridViewTypeProvider>{children}</GridViewTypeProvider>
            </ViewWrapper>
          </GlobalWrapper>
        </ThemeProvider>
      </>
    );
  }
}

GlobalTemplate.propTypes = {
  children: PropTypes.element.isRequired,
  user: PropTypes.string.isRequired,
};

export default GlobalTemplate;
