import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import client from 'awsClient';
import DELETE_VEHICLE from 'graphql/mutations/deleteVehicle';
import ChoosePopUp from 'components/molecules/ChoosePopUp';
import translations from 'translations/pl/statsBar.json';
import { routes } from 'routes/routes';

const SettingsWrap = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
`;

const Settings = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-100%, -100%);
  border: 2px solid ${({ theme }) => theme.colors.purple};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 15px;
  padding: 20px 30px;
  opacity: 0;
  transition: 0.2s ease;
`;

const SettingsBtn = styled.button`
  border: none;

  &:hover,
  &:focus {
    outline: none;
    opacity: 0.6;
  }
  &:focus ~ ${Settings} {
    opacity: 1;
  }
`;
const SettingsIcon = styled(FontAwesomeIcon)`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  transition: 0.3s ease;
`;

const SettingsOption = styled.p`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.purple};
  line-height: 2.5rem;
  transition: 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.gray};
  }
`;

class VehicleSettings extends Component {
  state = {
    deleteIsVisible: false,
  };

  toggleDeletePopUp = () => {
    this.setState(prevState => ({
      deleteIsVisible: !prevState.deleteIsVisible,
    }));
  };

  deleteVehicle = vehicleId => {
    client
      .mutate({
        variables: { vehicleId: vehicleId },
        mutation: DELETE_VEHICLE,
      })
      .then(result => {
        this.props.history.push(routes.allVehicles);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { deleteIsVisible } = this.state;
    const { vehicleId, editVehicle } = this.props;
    return (
      <SettingsWrap>
        <SettingsBtn>
          <SettingsIcon icon={faCog} onClick={this.toggleSettings} />
        </SettingsBtn>
        <Settings>
          <SettingsOption onClick={editVehicle}>Edytuj</SettingsOption>
          <SettingsOption onClick={this.toggleDeletePopUp}>Usuń</SettingsOption>
        </Settings>
        <ChoosePopUp
          isVisible={deleteIsVisible}
          yesFunc={() => this.deleteVehicle(vehicleId)}
          noFunc={this.toggleDeletePopUp}
        >
          {translations.areYouShure}
        </ChoosePopUp>
      </SettingsWrap>
    );
  }
}

VehicleSettings.propTypes = {
  vehicleId: PropTypes.string.isRequired,
  editVehicle: PropTypes.object.isRequired,
};

export default withRouter(VehicleSettings);
