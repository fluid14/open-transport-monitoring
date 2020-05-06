import React from 'react';
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

const VehicleErrors = () => (
  <StatsSection>
    <table>
      <tr>
        <Error
          icon={faThermometerHalf}
          title={translations.coolantTemperature}
          color="blue"
          active
        />
      </tr>
      <tr>
        <Error icon={faOilCan} title={translations.oilPressure} color="black" />
      </tr>
      <tr>
        <Error icon={faCarBattery} title={translations.battery} color="red" />
      </tr>
      <tr>
        <Error icon={faExclamationCircle} title={translations.engine} color="red" />
      </tr>
      <tr>
        <Error icon={faBullseye} title={translations.powerSteering} color="blue" active />
      </tr>
      <tr>
        <Error icon={faBacon} title={translations.abs} color="orange" />
      </tr>
    </table>
  </StatsSection>
);

export default VehicleErrors;
