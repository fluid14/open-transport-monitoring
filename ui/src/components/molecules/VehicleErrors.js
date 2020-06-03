import React from 'react';
import PropTypes from 'prop-types';
import translations from 'translations/pl/vehicleErrors.json';
import Error from 'components/atoms/Stats/Error';
import StatsSection from 'components/atoms/Stats/StatsSection';
import {
  faBacon,
  faBullseye,
  faCarBattery,
  faExclamationCircle,
  faOilCan,
  faThermometerHalf,
} from '@fortawesome/free-solid-svg-icons';

const VehicleErrors = ({ errors }) => {
  const { engine, oilLevel, coolantTemperature, battery, abs, powerSteering } = errors;
  return (
    <StatsSection>
      <table>
        <tr>
          <Error
            icon={faThermometerHalf}
            title={translations.coolantTemperature}
            color="blue"
            active={coolantTemperature}
          />
        </tr>
        <tr>
          <Error icon={faOilCan} title={translations.oilPressure} color="black" active={oilLevel} />
        </tr>
        <tr>
          <Error icon={faCarBattery} title={translations.battery} color="red" active={battery} />
        </tr>
        <tr>
          <Error
            icon={faExclamationCircle}
            title={translations.engine}
            color="red"
            active={engine}
          />
        </tr>
        <tr>
          <Error
            icon={faBullseye}
            title={translations.powerSteering}
            color="blue"
            active={powerSteering}
          />
        </tr>
        <tr>
          <Error icon={faBacon} title={translations.abs} color="orange" active={abs} />
        </tr>
      </table>
    </StatsSection>
  );
};
VehicleErrors.propTypes = {
  errors: PropTypes.object.isRequired,
};

export default VehicleErrors;
