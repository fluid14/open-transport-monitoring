import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'components/atoms/Button';
import translations from 'translations/pl/apiErrorMessage.json';

const ErrorWrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.purple};
  z-index: 9999;
  padding: 5rem 8rem;
`;

const Title = styled.p`
  font-size: 3rem;
  line-height: 1.1;
  margin-bottom: 2rem;
`;

const Subtitle = styled.p`
  font-size: 2rem;
  margin-bottom: 2.5rem;
`;

const ErrorPopUp = ({ onClick }) => (
  <ErrorWrap>
    <Title>{translations.error}</Title>
    <Subtitle>{translations.tryAgainLater}</Subtitle>
    <Button onClick={onClick}>Spróbuj ponownie</Button>
  </ErrorWrap>
);

ErrorPopUp.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ErrorPopUp;
