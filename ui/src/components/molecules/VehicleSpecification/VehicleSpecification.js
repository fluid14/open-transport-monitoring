import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import translations from 'translations/pl/statsBar.json';
import VehicleStatsBar from 'components/atoms/VehicleStatsBar';
import VehicleStatsBlock from 'components/atoms/VehicleStatsBlock';
import StatsSection from 'components/atoms/Stats/StatsSection';
import format from 'date-fns/format';
import ErrorPopUp from 'components/molecules/ErrorPopUp';
import positionToCity from 'components/molecules/VehicleSpecification/positionToCity';
import daysToDate from 'components/molecules/VehicleSpecification/daysToDate';
import getRideTime from 'components/molecules/VehicleSpecification/getRideTime';

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

class VehicleSpecification extends Component {
  state = {
    vehicleLocale: '',
    cityError: false,
  };

  componentDidMount() {
    const {
      stats: { position },
    } = this.props;
    positionToCity(position, this.setCity, this.setCityError);
  }

  setCity = city => {
    this.setState({
      vehicleLocale: city,
    });
  };

  setCityError = error => {
    if (error) {
      this.setState({
        cityError: true,
      });
    } else {
      this.setState({
        cityError: false,
      });
    }
  };

  render() {
    const {
      data,
      stats,
      stats: { position },
    } = this.props;
    const { vehicleLocale, cityError } = this.state;
    const { inspectionDate, insuranceDate } = data;
    const { fuelLevel, fuelConsumption, fuelRange, rideTime, mileage } = stats;
    if (cityError) {
      return (
        <ErrorPopUp onClick={() => positionToCity(position, this.setCity, this.setCityError)} />
      );
    }
    return (
      <>
        <StatsSection>
          <SectionTitle>{translations.mileage}</SectionTitle>
          <TotalDistance>{mileage}km</TotalDistance>
        </StatsSection>
        <SectionHorizontal>
          <InfoWrap>
            <SectionTitle>{translations.locale}</SectionTitle>
            <TotalDistance>{vehicleLocale}</TotalDistance>
          </InfoWrap>
          <InfoWrap>
            <SectionTitle>{translations.fuelConsumption}</SectionTitle>
            <TotalDistance>{fuelConsumption}l</TotalDistance>
          </InfoWrap>
        </SectionHorizontal>
        <StatsSection>
          <SectionTitle>{translations.overall}</SectionTitle>
          <VehicleStatsBar
            title={translations.rideTime}
            level={(getRideTime(rideTime) * 100) / 8}
            value={getRideTime(rideTime)}
            marker="h"
          />
          <VehicleStatsBar title={translations.fuelLevel} level={fuelLevel} marker="%" revers />
          <VehicleStatsBar
            title={translations.fuelRange}
            level={(Math.floor(fuelRange) * 100) / 2000}
            value={Math.floor(fuelRange)}
            marker="km"
            revers
          />
        </StatsSection>
        <StatsBlockWrap>
          <VehicleDaysTo title={translations.carReviewDate} daysTo={daysToDate(inspectionDate)}>
            {daysToDate(inspectionDate)} {translations.days}
          </VehicleDaysTo>
          <VehicleDaysTo title={translations.insurance} daysTo={daysToDate(insuranceDate)}>
            {daysToDate(insuranceDate)} {translations.days}
          </VehicleDaysTo>
        </StatsBlockWrap>
      </>
    );
  }
}

VehicleSpecification.propTypes = {
  data: PropTypes.object.isRequired,
  stats: PropTypes.object.isRequired,
  vehicleId: PropTypes.string.isRequired,
};

export default VehicleSpecification;
