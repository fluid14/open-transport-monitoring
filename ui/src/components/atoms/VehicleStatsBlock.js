import React from 'react';
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

const Title = styled.p`
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 400;
  margin-bottom: 1rem;
`;

const Info = styled.p`
  font-size: 2.2rem;
  font-weight: 300;
`;

const VehicleStatsBlock = ({ children, title }) => (
  <StatsWrap>
    <Title>{title}</Title>
    <Info>{children}</Info>
  </StatsWrap>
);

export default VehicleStatsBlock;
