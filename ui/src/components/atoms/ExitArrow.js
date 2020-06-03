import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ExitArrowWrap = styled.div`
  width: 3rem;
  height: 3rem;
  position: absolute;
  top: 2rem;
  left: 2rem;
  cursor: pointer;
  overflow: hidden;
  z-index: 99;

  span {
    position: absolute;
    top: 50%;
    right: 1px;
    display: block;
    width: 90%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.black};
    border-radius: 6px;
    transition: 0.3s ease;

    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      width: 45%;
      height: 2px;
      background-color: ${({ theme }) => theme.colors.black};
      transform: translateY(0.5px) rotate(45deg);
      transform-origin: 100%;
      border-radius: 6px;
      transition: rotate 0.3s 0.3s ease, transform 0.3s ease;
    }
    &::after {
      transform: translateY(-0.5px) rotate(-45deg);
    }
  }

  &:hover span {
    transform: translateX(-200%);
  }

  &:hover span::after,
  &:hover span::before {
    width: 80%;
    transform-origin: 50%;
    transform: translateX(240%) rotate(45deg);
  }

  &:hover span::before {
    transform: translateX(240%) rotate(-45deg);
  }

  ${({ cross }) =>
    cross &&
    `
      span {
        transform: translateX(-200%);
      }
    
      span::after,
      span::before {
        width: 80%;
        transform-origin: 50%;
        transform: translateX(240%) rotate(45deg);
      }
    
      span::before {
        transform: translateX(240%) rotate(-45deg);
      }
      
      &:hover span::after,
      &:hover span::before {
        width: 80%;
        transform-origin: 50%;
        transform: translateX(240%) rotate(0deg);
      }
    
      &:hover span::before {
        transform: translateX(240%) rotate(0deg);
      }
  `}
`;

const ExitArrow = ({ onClick, cross }) => (
  <ExitArrowWrap onClick={onClick} cross={cross}>
    <span></span>
  </ExitArrowWrap>
);

ExitArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
  cross: PropTypes.bool,
};

ExitArrow.defaultProps = {
  cross: false,
};

export default ExitArrow;
