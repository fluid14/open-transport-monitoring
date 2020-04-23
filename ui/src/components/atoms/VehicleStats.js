import React from 'react';
import styled from 'styled-components/macro';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const StatsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 6rem;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1rem;
  line-height: 1.2;
  margin-top: 0.7rem;
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const CircularStyled = buildStyles({
  pathTransitionDuration: 0.5,
  pathTransition: true,
  pathColor: 'red',
  textColor: '#f88',
  trailColor: '#d6d6d6',
  backgroundColor: '#3e98c7',
});

const VehicleStats = () => (
  <StatsWrap>
    <CircularProgressbar styles={CircularStyled} value="25" text="25%" />
    <Title>Poziom Paliwa</Title>
  </StatsWrap>
);

export default VehicleStats;
