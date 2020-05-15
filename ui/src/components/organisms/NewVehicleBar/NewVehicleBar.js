import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import translations from 'translations/pl/newVehicleBar.json';
import Button from 'components/atoms/Button';
import RightBar from 'components/atoms/RightBar';
import NewVehicleForm from 'components/molecules/NewVehicleForm';

const BarTitle = styled.p`
  font-size: 2.5rem;
  /* line-height: 4.3rem; */
  text-align: center;
  font-weight: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.purple};
`;

const SubmitButton = styled(Button)`
  margin-top: 2rem;
`;

const Arrow = styled.div`
  width: 3rem;
  height: 3rem;
  position: absolute;
  top: 2rem;
  left: 2rem;
  cursor: pointer;
  overflow: hidden;

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
`;

const NewVehicleBar = ({ isVisible, showBar }) => (
  <>
    <RightBar fixed isVisible={isVisible}>
      <Arrow onClick={showBar}>
        <span></span>
      </Arrow>
      <BarTitle>{translations.barTitle}</BarTitle>
      <NewVehicleForm />
    </RightBar>
  </>
);

NewVehicleBar.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  showBar: PropTypes.func.isRequired,
};

export default NewVehicleBar;
