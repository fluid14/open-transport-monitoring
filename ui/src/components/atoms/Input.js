import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputField = styled.input`
  width: 100%;
  font-size: 1.6rem;
  line-height: 1.6rem;
  background-color: ${({ theme }) => theme.colors.gray2};
  color: ${({ theme }) => theme.colors.gray3};
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  padding: 1rem 1.5rem;
  border: 2px solid transparent;
  font-weight: 600;
  transition: 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.lightGray};
  }

  ${({ select }) =>
    select &&
    `
    position: relative;
    appearance: none;
    height: calc(1.8rem + 2.5rem);
  `}
`;

const InputWrap = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const Title = styled.p`
  font-size: 1.6rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray3};
`;

const Input = ({ children, placeholder, type, name, onChange, onBlur, value, select }) => (
  <InputWrap>
    <Title>{placeholder}</Title>
    {!select && (
      <InputField
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        required
      />
    )}
    {select && (
      <InputField
        as="select"
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        select={select}
        required
      >
        {children}
      </InputField>
    )}
  </InputWrap>
);

Input.propTypes = {
  children: PropTypes.node,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  select: PropTypes.bool,
};

Input.defaultProps = {
  children: '',
  select: false,
};

export default Input;
