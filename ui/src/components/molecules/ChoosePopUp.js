import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import Button from 'components/atoms/Button';
import translations from 'translations/pl/choosePopUp.json';

const PopUpWrap = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid ${({ theme }) => theme.colors.purple};
  background-color: #fff;
  opacity: 0;
  width: 80%;
  padding: 20px 10px;
  border-radius: 15px;
  transition: 0.3s ease;

  ${({ isVisible }) =>
    isVisible &&
    `
    display: flex;
    opacity: 1
  `}
`;

const ButtonsWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;

  ${Button} {
    margin: 0 0.5rem;
    border-color: ${({ theme }) => theme.colors.purple};
  }
`;

const Text = styled.p`
  text-align: center;
  font-size: 1.8rem;
  line-height: 2.2rem;
  color: ${({ theme }) => theme.colors.purple};
`;

const ChoosePopUp = ({ children, yesFunc, noFunc, isVisible }) => (
  <PopUpWrap isVisible={isVisible}>
    <Text>{children}</Text>
    <ButtonsWrap>
      <Button onClick={yesFunc}>{translations.yes}</Button>
      <Button onClick={noFunc}>{translations.no}</Button>
    </ButtonsWrap>
  </PopUpWrap>
);

ChoosePopUp.propTypes = {
  children: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  yesFunc: PropTypes.func.isRequired,
  noFunc: PropTypes.func.isRequired,
};

export default ChoosePopUp;
