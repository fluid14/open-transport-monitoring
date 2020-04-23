import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { faGasPump } from '@fortawesome/free-solid-svg-icons';
import { GridViewTypeConsumer } from 'context/GridViewTypeContext';

const VehicleCardWrap = styled.div`
  position: relative;
  width: 22.5rem;
  height: 12.8rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1.8rem 2.9rem;
  transition: transform 0.3s ease;
  color: ${({ theme }) => theme.colors.black};
  &:hover {
    transform: translateY(-3%);
  }
`;

const Paragraph = styled.p`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.black};
  line-height: 1.9rem;
  text-align: left;
`;

const Mark = styled(Paragraph)`
  font-weight: ${({ theme }) => theme.fonts.extraBold};
`;

const Registration = styled(Paragraph)`
  position: absolute;
  bottom: 0.7rem;
  right: 1.3rem;
  font-size: 1rem;
  text-transform: uppercase;
  width: unset;
  padding: 0;
`;

const Status = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${({ theme, status }) =>
    status ? theme.colors.status.enable : theme.colors.status.disable};

  ${({ gridType }) =>
    gridType &&
    `
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
  `};
`;

const InfoWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  margin: 0.7rem 0 0.7rem 1.2rem;
  font-size: 1.2rem;

  &:nth-child(1) {
    margin-left: 0;
  }
`;

const InfoText = styled.p`
  font-size: 1.2rem;
  margin-left: 0.6rem;
`;

const StyledTR = styled.tr`
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    transform: translateX(1%);
  }
`;

const StyledTD = styled.td`
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
  margin: 0;
  padding: 1rem 2.2rem;

  &:nth-child(1) {
    border-radius: 8px 0 0 8px;
  }

  &:nth-last-child(1) {
    border-radius: 0 8px 8px 0;
  }

  ${Paragraph} {
    text-align: unset;
  }
`;

const VehicleCard = ({ to, brand, model, fuel, locale, status, registration }) => {
  const history = useHistory();
  return (
    <GridViewTypeConsumer>
      {gridView => (
        <>
          {gridView.type && (
            <Link to={to}>
              <VehicleCardWrap>
                <Mark>{brand}</Mark>
                <Paragraph>{model}</Paragraph>
                <Status status={status} />
                <InfoWrap>
                  <Info>
                    <FontAwesomeIcon icon={faGasPump} />
                    <InfoText>{fuel}%</InfoText>
                  </Info>
                  <Info>
                    <FontAwesomeIcon icon={faLocationArrow} />
                    <InfoText>{locale}</InfoText>
                  </Info>
                </InfoWrap>
                <Registration>{registration}</Registration>
              </VehicleCardWrap>
            </Link>
          )}
          {!gridView.type && (
            <StyledTR onClick={() => history.push(to)}>
              <StyledTD>
                <Mark>{brand}</Mark>
              </StyledTD>
              <StyledTD>
                <Paragraph>{model}</Paragraph>
              </StyledTD>
              <StyledTD>
                <Paragraph>{locale}</Paragraph>
              </StyledTD>
              <StyledTD>
                <Paragraph>{fuel}%</Paragraph>
              </StyledTD>
              <StyledTD>
                <Status gridType={!gridView.type} status={status} />
              </StyledTD>
            </StyledTR>
          )}
        </>
      )}
    </GridViewTypeConsumer>
  );
};

VehicleCard.propTypes = {
  brand: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  fuel: PropTypes.number.isRequired,
  locale: PropTypes.string.isRequired,
  status: PropTypes.bool,
  registration: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

VehicleCard.defaultProps = {
  status: false,
};

export default VehicleCard;
