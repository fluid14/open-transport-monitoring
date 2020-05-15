import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputWrap = styled.div`
  position: relative;
  margin-bottom: 2.5rem;
  width: 100%;
`;

const InputNameHelper = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-bottom: ${({ theme }) => `2px solid ${theme.colors.gray}`};
  z-index: -1;
  &::before {
    content: '${({ placeholder }) => placeholder}';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.gray};
    font-size: 1.5rem;
    font-weight: 1;
    transition: .3s ease;
  }

  &::after{
    content: '';
    display: block;
    position: absolute;
    bottom: -2px;
    left: 0;
    height: 2px;
    width: 0;
    background-color: ${({ theme }) => theme.colors.purple};
    z-index: 99;
    transition: .4s ease;
  }
`;

const InputField = styled.input`
  outline: none;
  border: none;
  padding: 4px 0;
  font-size: 1.4rem;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.colors.gray};

  ::placeholder {
    font-size: 0;
    color: transparent;
  }

  :not(:placeholder-shown) + ${InputNameHelper}::before, :focus + ${InputNameHelper}::before {
    transform: translateY(-105%);
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.gray};
  }

  :not(:placeholder-shown) + ${InputNameHelper}::after, :focus + ${InputNameHelper}::after {
    width: 100%;
  }
`;

const Input = ({ placeholder, type, name, onChange, onBlur, value }) => (
  <InputWrap>
    <InputField
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      required
    />
    <InputNameHelper placeholder={placeholder} />
  </InputWrap>
);

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
