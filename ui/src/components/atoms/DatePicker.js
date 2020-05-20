import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import 'react-day-picker/lib/style.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import dateFnsFormat from 'date-fns/format';
import translations from 'translations/pl/datePicker.json';

const DatePickerWrap = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;

  .DayPickerInput {
    width: 100%;
  }

  .DayPicker {
    font-size: 1.18rem;
  }

  .DayPicker-Day--today {
    background-color: ${({ theme }) => theme.colors.purple};
    color: ${({ theme }) => theme.colors.white};
    &:hover {
      color: ${({ theme }) => theme.colors.black};
    }
  }

  input {
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
  }
`;

const Title = styled.p`
  font-size: 1.6rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray3};
`;

const DatePicker = ({ onChange, name, onBlur, placeholder, value }) => {
  const { weekDaysShort, weekDaysLong, months } = translations;
  const FORMAT = 'yyyy-MM-dd';
  return (
    <DatePickerWrap>
      <Title>{placeholder}</Title>
      <DayPickerInput
        dayPickerProps={{
          months: months,
          weekdaysLong: weekDaysLong,
          weekdaysShort: weekDaysShort,
          firstDayOfWeek: 1,
        }}
        inputProps={{ readOnly: true }}
        onDayChange={day => onChange(name, dateFnsFormat(day, FORMAT))}
        name={name}
        onBlur={onBlur}
        format={FORMAT}
        value={value}
        placeholder=""
        required
      />
    </DatePickerWrap>
  );
};

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
};

DatePicker.defaultProps = {
  value: '',
};

export default DatePicker;
