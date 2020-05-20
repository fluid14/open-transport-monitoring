import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { keyframes } from 'styled-components';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const StyledCircularProgressbar = styled(CircularProgressbar)`
  font-weight: 700;
`;

const statsAppear = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5)
  }

  60% {
    transform: scale(1.05);
  
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const StatsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 7rem;
  text-align: center;
  animation: 1s 0.5s ease ${statsAppear} backwards;

  @media screen and (min-width: 1600px) {
    width: 8.5rem;
  }
`;

const Title = styled.p`
  font-size: 1rem;
  line-height: 1.3;
  margin-top: 0.7rem;
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 2px;
  @media screen and (min-width: 1600px) {
    font-size: 1.2rem;
    line-height: 1.5;
    margin-top: 1rem;
  }
`;

const circularStyles = {
  red: {
    rotation: 0.6,
    pathColor: 'rgb(248, 37, 87)',
    trailColor: 'transparent',
    textColor: '#ffffff',
    textSize: '1.6rem',
    backgroundColor: 'rgba(130,33,70, 0.7)',
  },
  blue: {
    rotation: 0.6,
    pathColor: 'rgb(41, 68, 214)',
    trailColor: 'transparent',
    textColor: '#ffffff',
    textSize: '1.6rem',
    backgroundColor: 'rgba(34, 46, 142, 0.7)',
  },
};

const VehicleStatsCircle = ({ className, value, maxValue, valueText, title, style }) => (
  <StatsWrap className={className}>
    <StyledCircularProgressbar
      styles={buildStyles(circularStyles[style])}
      value={value}
      maxValue={maxValue}
      circleRatio={0.8}
      text={valueText}
      background
      backgroundPadding={0}
      strokeWidth={7}
    />
    <Title>{title}</Title>
  </StatsWrap>
);

VehicleStatsCircle.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  maxValue: PropTypes.string,
  valueText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
};

VehicleStatsCircle.defaultProps = {
  className: '',
  value: '0',
  maxValue: '100',
};

export default VehicleStatsCircle;
