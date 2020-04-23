import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GlobalStyle from 'theme/GlobalStyle';
import theme from 'theme/theme';
import styled, { ThemeProvider } from 'styled-components';
import TopBar from 'components/organisms/TopBar/TopBar';
import SideBarMenu from 'components/organisms/SideBarMenu/SideBarMenu';
import NewVehicleBar from 'components/organisms/NewVehicleBar/NewVehicleBar';
import Map from 'components/organisms/Map/Map';
import { GridViewTypeProvider } from 'context/GridViewTypeContext';

const GlobalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow-y: scroll;
  padding: 0 3.7rem;
  &::-webkit-scrollbar {
    display: none;
  }
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

  showNewVehicleBar = () => {
    this.setState(prevState => ({
      isNewVehicleBarVisible: !prevState.isNewVehicleBarVisible,
    }));
  };

  render() {
    const { children, user } = this.props;
    const { isNewVehicleBarVisible } = this.state;

    return (
      <>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <GlobalWrapper>
            <SideBarMenu
              showNewVehicleBar={this.showNewVehicleBar}
              isNewVehicleBarActive={isNewVehicleBarVisible}
            />
            <NewVehicleBar isVisible={isNewVehicleBarVisible} showBar={this.showNewVehicleBar} />
            <ViewWrapper>
              <GridViewTypeProvider>
                <>
                  <TopBar userName={user === '' ? 'Jan Nowak' : user} />
                  <ContentWrapper>{children}</ContentWrapper>
                  <Map />
                </>
              </GridViewTypeProvider>
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
