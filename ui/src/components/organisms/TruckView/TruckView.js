import React from 'react';
import styled from 'styled-components/macro';
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

const TruckView = () => (
  <VehicleWrap>
    <GridBox column="1/20" row="1/2">
      <VehicleName model="F-Max" brand="Ford" plateNumber="PZ102KS" status />
    </GridBox>
    <GridBox column="2/6" row="8/11">
      <VehicleStatsCircle
        title={translations.speed}
        value={45}
        maxValue="130"
        valueText="45km/h"
        style="red"
        top="5"
        left="30"
        className="box1"
      />
    </GridBox>
    <GridBox column="2/6" row="12/15">
      <VehicleStatsCircle
        title={translations.rpm}
        value="2.2"
        maxValue="5"
        valueText="2.2tys"
        style="red"
        top="15"
        left="20"
      />
    </GridBox>
    <GridBox column="4/8" row="4/7">
      <VehicleStatsCircle
        title={translations.lFrontTirePressure}
        value="0"
        valueText="2.1bar"
        style="blue"
      />
    </GridBox>
    <GridBox column="4/8" row="16/19">
      <VehicleStatsCircle
        title={translations.lRearTirePressure}
        value="0"
        valueText="1.9bar"
        style="blue"
      />
    </GridBox>
    <GridBox column="8/14" row="2/20">
      <Truck />
    </GridBox>
    <GridBox column="14/18" row="4/7">
      <VehicleStatsCircle
        title={translations.rFrontTirePressure}
        value="0"
        valueText="2.2bar"
        style="blue"
      />
    </GridBox>
    <GridBox column="14/18" row="16/19">
      <VehicleStatsCircle
        title={translations.rRearTirePressure}
        value="0"
        valueText="2.3bar"
        style="blue"
      />
    </GridBox>
    <GridBox column="16/20" row="8/11">
      <VehicleStatsCircle
        title={translations.oilPressure}
        value="50"
        valueText="329kPa"
        style="red"
      />
    </GridBox>
    <GridBox column="16/20" row="12/15">
      <VehicleStatsCircle
        title={translations.oilTemperature}
        value="60"
        valueText="80&#8451;"
        style="red"
      />
    </GridBox>
  </VehicleWrap>
);

export default TruckView;
