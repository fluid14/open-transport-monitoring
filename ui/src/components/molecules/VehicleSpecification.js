import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { keyframes } from 'styled-components';
import translations from 'translations/pl/statsBar.json';
import VehicleStatsBar from 'components/atoms/VehicleStatsBar';
import VehicleStatsBlock from 'components/atoms/VehicleStatsBlock';
import StatsSection from 'components/atoms/Stats/StatsSection';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

const TotalDistance = styled.p`
  font-size: 2.5rem;
  opacity: 0.6;
  font-weight: 300;
`;

const StatsBlockWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SectionHorizontal = styled(StatsSection)`
  display: flex;
  justify-content: space-between;
`;

const InfoWrap = styled.div`
  text-align: center;
  margin-right: 5rem;
`;

const SectionTitle = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  opacity: 0.8;
  margin-bottom: 1.5rem;
`;

const fewDays = keyframes`
  from{
    opacity: 1;
  }
  
  to{
    opacity: 0.2;
  }
`;

const VehicleDaysTo = styled(VehicleStatsBlock)`
  --fewDaysAnim: ${fewDays};
  ${({ daysTo }) =>
    daysTo < 10 &&
    `
    p{
      animation: 1s infinite alternate var(--fewDaysAnim);
    }
  `}
`;

const VehicleSpecification = ({ data }) => {
  const { inspectionDate, insuranceDate } = data;
  const daysToInspection = differenceInCalendarDays(new Date(inspectionDate), new Date());
  const daysToInsurance = differenceInCalendarDays(new Date(insuranceDate), new Date());
  return (
    <>
      <StatsSection>
        <SectionTitle>{translations.mileage}</SectionTitle>
        <TotalDistance>127 534km</TotalDistance>
      </StatsSection>
      <SectionHorizontal>
        <InfoWrap>
          <SectionTitle>{translations.locale}</SectionTitle>
          <TotalDistance>Poznań</TotalDistance>
        </InfoWrap>
        <InfoWrap>
          <SectionTitle>{translations.fuelConsumption}</SectionTitle>
          <TotalDistance>12l</TotalDistance>
        </InfoWrap>
      </SectionHorizontal>
      <StatsSection>
        <SectionTitle>{translations.overall}</SectionTitle>
        <VehicleStatsBar
          title={translations.rideTime}
          level={(7.5 * 100) / 8}
          value="7.5"
          marker="h"
        />
        <VehicleStatsBar title={translations.fuelLevel} level="21" marker="%" revers />
        <VehicleStatsBar title={translations.fuelRange} level="78" marker="km" revers />
      </StatsSection>
      <StatsBlockWrap>
        <VehicleDaysTo title={translations.carReviewDate} daysTo={daysToInspection}>
          {daysToInspection}dni
        </VehicleDaysTo>
        <VehicleDaysTo title={translations.insurance} daysTo={daysToInsurance}>
          {daysToInsurance}dni
        </VehicleDaysTo>
      </StatsBlockWrap>
    </>
  );
};

VehicleSpecification.propTypes = {
  data: PropTypes.object.isRequired,
};

export default VehicleSpecification;
