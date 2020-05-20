import React from 'react';
import PropTypes from 'prop-types';
import translations from 'translations/pl/newVehicleBar.json';
import RightBar from 'components/atoms/RightBar';
import VehicleForm from 'components/molecules/VehicleForm';
import BarTitle from 'components/atoms/BarTitle';
import ExitArrow from 'components/atoms/ExitArrow';

const NewVehicleBar = ({ isVisible, toggleBar }) => (
  <>
    <RightBar fixed isVisible={isVisible}>
      <ExitArrow onClick={toggleBar}>
        <span></span>
      </ExitArrow>
      <BarTitle>{translations.barTitle}</BarTitle>
      <VehicleForm toggleNewVehicleBar={toggleBar} type="add" />
    </RightBar>
  </>
);

NewVehicleBar.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  toggleBar: PropTypes.func.isRequired,
};

export default NewVehicleBar;
