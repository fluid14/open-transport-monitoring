import React from 'react';
import styled from 'styled-components/macro';
import { keyframes } from 'styled-components/macro';

const BeamAnimation = keyframes`
  from{
    height: 100px;
  }
  
  to{
    height: 20px;
  }
`;

const PreloaderWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  transition: 0.3s ease;
  opacity: 0.9;
  background-color: ${({ theme }) => theme.colors.purple};

  ${({ loading }) =>
    !loading &&
    `
    opacity: 0;
    z-index: -1;
  `};
`;

const BeamWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
`;

const Beam = styled.div`
  position: absolute;
  bottom: 0;
  left: ${({ shift }) => `${shift}px`};
  display: inline-block;
  width: 2px;
  height: 100px;
  background-color: #fff;
  margin-right: 25px;
  opacity: 0.8;
  animation: 0.7s ${({ delay }) => `${delay}s`} ease-in infinite alternate ${BeamAnimation};
`;

const Preloader = ({ loading }) => (
  <PreloaderWrap loading={loading}>
    <BeamWrap>
      <Beam delay={0.5}></Beam>
      <Beam shift={25} delay={0.7}></Beam>
      <Beam shift={50} delay={0}></Beam>
      <Beam shift={75} delay={0.2}></Beam>
      <Beam shift={100} delay={0.3}></Beam>
    </BeamWrap>
  </PreloaderWrap>
);

export default Preloader;
