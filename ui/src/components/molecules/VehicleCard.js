import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const VehicleCardWrap = styled.div`
  position: relative;
  width: ${({ cardStyle }) => (cardStyle ? '22.5rem' : '100%')};
  height: 12.8rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1.8rem 2.9rem;
  transition: 0.3s ease;
`;

const Paragraph = styled.p`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.black};
  line-height: 1.9rem;
`;

const Mark = styled(Paragraph)`
  font-weight: ${({ theme }) => theme.fonts.bold};
`;

const Registration = styled(Paragraph)`
  position: absolute;
  bottom: 7px;
  right: 13px;
  font-size: 9px;
  text-transform: uppercase;
`;

const Status = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ theme, status }) =>
    status ? theme.colors.status.enable : theme.colors.status.disable};
`;

const VehicleCard = ({ brand, model, status, cardStyle, registration }) => (
  <>
    <VehicleCardWrap cardStyle={cardStyle}>
      <Mark>{brand}</Mark>
      <Paragraph>{model}</Paragraph>
      <Status status={status} />
      <Registration>{registration}</Registration>
    </VehicleCardWrap>
  </>
);

VehicleCard.propTypes = {
  brand: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  status: PropTypes.bool,
  cardStyle: PropTypes.bool.isRequired,
  registration: PropTypes.string.isRequired,
};

VehicleCard.defaultProps = {
  status: false,
};

export default VehicleCard;
