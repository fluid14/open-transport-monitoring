import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLocationArrow} from '@fortawesome/free-solid-svg-icons'
import {faGasPump} from '@fortawesome/free-solid-svg-icons'

const VehicleCardWrap = styled.div`
  position: relative;
  width: ${({cardStyle}) => (cardStyle ? '22.5rem' : '100%')};
  height: 12.8rem;
  border-radius: 8px;
  background-color: ${({theme}) => theme.colors.white};
  padding: 1.8rem 2.9rem;
  transition: 0.3s ease;
  color: ${({theme}) => theme.colors.black};
  &:hover{
    transform: translateY(-3%);
  };
`;

const Paragraph = styled.p`
  font-size: 1.4rem;
  font-weight: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.black};
  line-height: 1.9rem;
`;

const Mark = styled(Paragraph)`
  font-weight: ${({theme}) => theme.fonts.extraBold};
`;

const Registration = styled(Paragraph)`
  position: absolute;
  bottom: 0.7rem;
  right: 1.3rem;
  font-size: 1rem;
  text-transform: uppercase;
`;

const Status = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${({theme, status}) =>
    status ? theme.colors.status.enable : theme.colors.status.disable};
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
  
  &:nth-child(1){
    margin-left: 0;
  }
`;

const InfoText = styled.p`
  font-size: 1.2rem;
  margin-left: 0.6rem;
`;

const VehicleCard = ({to, brand, model, status, cardStyle, registration}) => (
    <>
        <Link to={to}>
            <VehicleCardWrap cardStyle={cardStyle}>
                <Mark>{brand}</Mark>
                <Paragraph>{model}</Paragraph>
                <Status status={status}/>
                <InfoWrap>
                    <Info>
                        <FontAwesomeIcon icon={faGasPump}/>
                        <InfoText>69%</InfoText>
                    </Info>
                    <Info>
                        <FontAwesomeIcon icon={faLocationArrow}/>
                        <InfoText>Poznań</InfoText>
                    </Info>
                </InfoWrap>
                <Registration>{registration}</Registration>
            </VehicleCardWrap>
        </Link>
    </>
);

VehicleCard.propTypes = {
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    status: PropTypes.bool,
    cardStyle: PropTypes.bool.isRequired,
    registration: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

VehicleCard.defaultProps = {
    status: false,
};

export default VehicleCard;
