import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import translations from 'translations/pl/newVehicleBar.json';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';

const VehicleBarWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transform: ${({ isVisible }) => (isVisible === true ? 'translateX(0)' : 'translateX(200%)')};
  width: 40rem;
  height: 100vh;
  background-color: #fff;
  z-index: 999;
  transition: 0.5s ease;
  padding: 8rem 2rem;
  box-shadow: 0px 2px 33px 0px rgba(0, 0, 0, 0.75);
`;

const BarTitle = styled.p`
  font-size: 2.5rem;
  /* line-height: 4.3rem; */
  text-align: center;
  font-weight: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.purple};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 70%;
  height: 100%;
`;

const SubmitButton = styled(Button)`
  margin-top: 2rem;
`;

const NewVehicleBar = ({ isVisible }) => (
  <>
    <VehicleBarWrap isVisible={isVisible}>
      <BarTitle>{translations.barTitle}</BarTitle>
      <Form>
        <Input placeholder={translations.mark} type="text" />
        <Input placeholder={translations.model} type="text" />
        <Input placeholder={translations.registration_number} type="text" />
        <Input placeholder={translations.device_id} type="text" />
        <SubmitButton type="submit">{translations.add}</SubmitButton>
      </Form>
    </VehicleBarWrap>
  </>
);

NewVehicleBar.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default NewVehicleBar;
