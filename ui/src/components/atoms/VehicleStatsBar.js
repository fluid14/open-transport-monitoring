import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import StatsTitle from 'components/atoms/Stats/StatsTitle';

const TitleWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const StatsBar = styled.div`
  position: relative;
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.extraLightGray};
  border-radius: 4px;
  margin-bottom: 2.2rem;
  transition: 0.3s ease;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ level }) => `${level}%`};
    height: 4px;
    border-radius: 4px;
    background-color: ${({ level, theme }) => (level >= 80 ? theme.colors.red : theme.colors.blue)};
  }

  ${({ revers, level }) =>
    revers &&
    level <= 20 &&
    `
    &::after{
      background-color: red;
  `}
`;

const VehicleStatsBar = ({ title, level, value, marker, revers }) => (
  <>
    <TitleWrap>
      <StatsTitle>{title}</StatsTitle>
      <StatsTitle>
        {value ? value : level}
        {marker}
      </StatsTitle>
    </TitleWrap>
    <StatsBar level={level} revers={revers} />
  </>
);
VehicleStatsBar.propTypes = {
  title: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  value: PropTypes.string,
  marker: PropTypes.string.isRequired,
  revers: PropTypes.string,
};

VehicleStatsBar.defaultProps = {
  value: '',
  revers: false,
};
export default VehicleStatsBar;
