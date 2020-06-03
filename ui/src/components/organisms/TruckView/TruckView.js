import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VehicleName from 'components/atoms/VehicleName';
import VehicleStatsCircle from 'components/atoms/VehicleStatsCircle';
import Truck from 'components/atoms/Truck';
import translations from 'translations/pl/truck.json';

const VehicleWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(20, 5%);
  grid-template-rows: repeat(20, 5%);
  height: 100vh;
  width: 100%;
  padding: 3rem 3.7rem 0 3.7rem;
  overflow: hidden;
  user-select: none;
`;

const GridBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  grid-column: ${({ column }) => column};
  grid-row: ${({ row }) => row};
`;

const TruckView = ({ model, brand, plateNumber, stats, parameterLimits }) => {
  const { speed, rpm, oilPressure, oilTemperature, tyresPressure } = stats;
  const {
    speed: speedLimits,
    engineSpeed: engineSpeedLimits,
    oilPressure: oilPressureLimits,
    oilTemperature: oilTemperatureLimits,
    tyrePressure: tyrePressureLimits,
  } = parameterLimits;
  return (
    <VehicleWrap>
      <GridBox column="1/20" row="1/2">
        <VehicleName model={model} brand={brand} plateNumber={plateNumber} status />
      </GridBox>
      <GridBox column="2/6" row="8/11">
        <VehicleStatsCircle
          title={translations.speed}
          value={speed}
          maxValue={speedLimits.max}
          unit={speedLimits.unit}
          style="red"
          className="box1"
        />
      </GridBox>
      <GridBox column="2/6" row="12/15">
        <VehicleStatsCircle
          title={translations.rpm}
          value={rpm}
          maxValue={engineSpeedLimits.max}
          unit={engineSpeedLimits.unit}
          style="red"
        />
      </GridBox>
      <GridBox column="4/8" row="4/7">
        <VehicleStatsCircle
          title={translations.lFrontTirePressure}
          value={tyresPressure[0]}
          maxValue={tyrePressureLimits.max}
          unit={tyrePressureLimits.unit}
          style="blue"
        />
      </GridBox>
      <GridBox column="4/8" row="16/19">
        <VehicleStatsCircle
          title={translations.lRearTirePressure}
          value={tyresPressure[1]}
          maxValue={tyrePressureLimits.max}
          unit={tyrePressureLimits.unit}
          style="blue"
        />
      </GridBox>
      <GridBox column="8/14" row="2/20">
        <Truck />
      </GridBox>
      <GridBox column="14/18" row="4/7">
        <VehicleStatsCircle
          title={translations.rFrontTirePressure}
          value={tyresPressure[2]}
          maxValue={tyrePressureLimits.max}
          unit={tyrePressureLimits.unit}
          style="blue"
        />
      </GridBox>
      <GridBox column="14/18" row="16/19">
        <VehicleStatsCircle
          title={translations.rRearTirePressure}
          value={tyresPressure[3]}
          maxValue={tyrePressureLimits.max}
          unit={tyrePressureLimits.unit}
          style="blue"
        />
      </GridBox>
      <GridBox column="16/20" row="8/11">
        <VehicleStatsCircle
          title={translations.oilPressure}
          value={oilPressure * 10000}
          maxValue={oilPressureLimits.max}
          unit={oilPressureLimits.unit}
          style="red"
        />
      </GridBox>
      <GridBox column="16/20" row="12/15">
        <VehicleStatsCircle
          title={translations.oilTemperature}
          value={oilTemperature}
          maxValue={oilTemperatureLimits.max}
          unit={oilTemperatureLimits.unit}
          style="red"
        />
      </GridBox>
    </VehicleWrap>
  );
};

TruckView.propTypes = {
  model: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  plateNumber: PropTypes.string.isRequired,
  stats: PropTypes.object.isRequired,
  parameterLimits: PropTypes.object.isRequired,
};

export default TruckView;
