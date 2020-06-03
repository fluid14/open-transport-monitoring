import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SelectWrap = styled.select`
  width: 100%;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.gray};
  padding: 50px;
  border-radius: 0;
`;

const Select = ({ children, name, onChange, onBlur, value }) => (
  <SelectWrap name={name} onChange={onChange} onBlur={onBlur} value={value} required>
    {children}
  </SelectWrap>
);

Select.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Select;
