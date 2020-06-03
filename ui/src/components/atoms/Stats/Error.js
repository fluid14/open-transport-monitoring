import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ErrorWrap = styled.td`
  font-size: 3rem;
  padding: 3rem 2rem 2rem;
  opacity: 0.9;
  color: ${({ theme, color, active }) => (active ? theme.colors[`${color}`] : 'rgba(0,0,0,0.1)')};

  @media screen and (min-width: 1800px) {
    padding: 2.5rem 1.6rem 1.6rem;
  }
`;

const Title = styled.p`
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 400;
  margin-left: 2rem;
`;

const Error = ({ active, icon, color, title }) => (
  <>
    <ErrorWrap active={active} color={color}>
      <FontAwesomeIcon icon={icon} />
    </ErrorWrap>
    <ErrorWrap active={active}>
      <Title>{title}</Title>
    </ErrorWrap>
  </>
);

Error.propTypes = {
  error: PropTypes.bool,
  icon: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

Error.defaultProps = {
  error: false,
};

export default Error;
