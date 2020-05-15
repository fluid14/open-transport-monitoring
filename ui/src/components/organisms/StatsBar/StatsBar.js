import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import RightBar from 'components/atoms/RightBar';
import TopBar from 'components/organisms/TopBar/TopBar';
import translations from 'translations/pl/statsBar.json';
import ChangeView from 'components/atoms/ChangeView';
import VehicleErrors from 'components/molecules/VehicleErrors';
import VehicleSpecification from 'components/molecules/VehicleSpecification';
import VehicleSettings from 'components/molecules/VehicleSettings';

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

const EditVehicle = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  height: 100%;
  z-index: 3;
`;

class StatsBar extends Component {
  state = {
    errorActive: false,
    editVehicleActive: false,
  };

  changeView = () => {
    this.setState(prevState => ({
      errorActive: !prevState.errorActive,
    }));
  };

  editVehicleShow = () => {
    this.setState(prevState => ({
      editVehicleActive: !prevState.editVehicleActive,
    }));
  };

  render() {
    const { errorActive, editVehicleActive } = this.state;
    const { vehicleId, data } = this.props;
    console.log(data);
    return (
      <StyledRightBar statsBar isVisible={true}>
        <TopBar userName="Jan Nowak" noSwitch vehicle />
        <Wrap>
          {!editVehicleActive && (
            <StyledChangeView onClick={this.changeView}>
              {errorActive && <p>{translations.spec}</p>}
              {!errorActive && <p>{translations.errors}</p>}
            </StyledChangeView>
          )}
          {!errorActive && !editVehicleActive && (
            <>
              <Title>{translations.spec}</Title>
              <VehicleSpecification />
            </>
          )}
          {errorActive && !editVehicleActive && (
            <>
              <Title>{translations.errors}</Title>
              <VehicleErrors />
            </>
          )}
          {editVehicleActive && (
            <EditVehicle>
              <p>test</p>
            </EditVehicle>
          )}
          <VehicleSettings vehicleId={vehicleId} editVehicle={this.editVehicleShow} />
        </Wrap>
      </StyledRightBar>
    );
  }
}

StatsBar.propTypes = {
  vehicleId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default StatsBar;
