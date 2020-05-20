import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StatsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  height: 50px;
  color: ${({ theme }) => theme.colors.lightGray};
  margin-top: 2rem;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 400;
  margin-bottom: 1rem;
`;

const Info = styled.p`
  font-size: 2.2rem;
  font-weight: 300;
`;

const VehicleStatsBlock = ({ children, className, title }) => (
  <StatsWrap className={className}>
    <Title>{title}</Title>
    <Info>{children}</Info>
  </StatsWrap>
);

VehicleStatsBlock.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
};

VehicleStatsBlock.defaultType = {
  className: '',
};

export default VehicleStatsBlock;
