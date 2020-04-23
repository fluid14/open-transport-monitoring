import React from 'react';
import styled from 'styled-components/macro';
import { GridViewTypeConsumer } from 'context/GridViewTypeContext';

const SwitchWrap = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 2.7rem;
  border: none;
  transition: 0.3s ease;
  cursor: pointer;

  span,
  span::before,
  span::after {
    content: '';
    display: block;
    background-color: #fff;
    width: 0.5rem;
    height: ${({ gridView }) => (gridView ? '0.4rem' : '0.5rem')};
    margin: 0.2rem;
    border-radius: 1px;
    transition: 0.3s ease;
    opacity: 1;
  }

  span::before,
  span::after {
    position: absolute;
    transform: translateY(-40%);
  }

  span::before {
    left: 0;
  }

  span::after {
    right: 0;
  }

  ${({ gridView }) =>
    gridView &&
    `   
      span::before{
        width: 85%;
      }
      
      span::before,
      span::after{
        transform: translateY(-50%);
      }
  `}
`;

const ViewStyleSwitch = () => (
  <GridViewTypeConsumer>
    {gridView => (
      <SwitchWrap onClick={gridView.changeType} gridView={gridView.type}>
        <span></span>
        <span></span>
        <span></span>
      </SwitchWrap>
    )}
  </GridViewTypeConsumer>
);

export default ViewStyleSwitch;
