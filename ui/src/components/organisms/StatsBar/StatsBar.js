import React, { Component } from 'react';
import styled from 'styled-components/macro';
import RightBar from 'components/atoms/RightBar';
import TopBar from 'components/organisms/TopBar/TopBar';
import translations from 'translations/pl/statsBar.json';
import ChangeView from 'components/atoms/ChangeView';
import VehicleErrors from 'components/molecules/VehicleErrors';
import VehicleSpecification from 'components/molecules/VehicleSpecification';

const Wrap = styled.div`
  position: relative;
`;

const StyledRightBar = styled(RightBar)`
  padding-right: 4rem;
  padding-left: 4rem;
  padding-bottom: 2rem;
  width: 33rem;
  z-index: 0;
  overflow-y: scroll;
  height: 100vh;
`;
const Title = styled.p`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const StyledChangeView = styled(ChangeView)`
  top: 0;
  right: 0;
`;

class StatsBar extends Component {
  state = {
    errorActive: false,
  };

  changeView = () => {
    this.setState(prevState => ({
      errorActive: !prevState.errorActive,
    }));
  };

  render() {
    const { errorActive } = this.state;
    return (
      <StyledRightBar statsBar isVisible={true}>
        <TopBar userName="Jan Nowak" noSwitch vehicle />
        <Wrap>
          <StyledChangeView onClick={this.changeView}>
            {errorActive && <p>{translations.spec}</p>}
            {!errorActive && <p>{translations.errors}</p>}
          </StyledChangeView>
          {!errorActive && (
            <>
              <Title>{translations.spec}</Title>
              <VehicleSpecification />
            </>
          )}
          {errorActive && (
            <>
              <Title>{translations.errors}</Title>
              <VehicleErrors />
            </>
          )}
        </Wrap>
      </StyledRightBar>
    );
  }
}

export default StatsBar;
