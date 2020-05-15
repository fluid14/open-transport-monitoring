import React, { Component } from 'react';
import ADD_VEHICLE from 'graphql/mutations/addVehicle';
import { Formik } from 'formik';
import { Query } from 'react-apollo';
import ALL_DEVICES from 'graphql/queries/allDevices';
import translations from 'translations/pl/newVehicleBar.json';
import Mutation from 'react-apollo/Mutation';
import styled from 'styled-components/macro';
import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import Select from 'components/atoms/Select';
import { withRouter } from 'react-router-dom';

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
`;

const StyledButton = styled(Button)`
  margin-top: 2.5rem;
`;

const initialState = {
  brand: '',
  model: '',
  deviceId: '',
  plateNumber: '',
  insuranceDate: '',
  inspectionDate: '',
};

class NewVehicleForm extends Component {
  state = {
    formState: initialState,
  };

  handleFormSubmit = (values, setSubmitting, addVehicle, data) => {
    const { deviceId, plateNumber, brand, model, insuranceDate, inspectionDate } = values;
    addVehicle({
      variables: {
        deviceId: deviceId,
        plateNumber: plateNumber,
        brand: brand,
        model: model,
        insuranceDate: insuranceDate,
        inspectionDate: inspectionDate,
      },
    });
    setSubmitting(false);
    return data;
  };

  render() {
    return (
      <Mutation mutation={ADD_VEHICLE}>
        {(addVehicle, { data }) => (
          <FormWrap>
            <Formik
              initialValues={initialState}
              onSubmit={(values, { setSubmitting }) =>
                this.handleFormSubmit(values, setSubmitting, addVehicle, data)
              }
            >
              {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                  <Input
                    type="text"
                    name="brand"
                    placeholder={translations.brand}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.brand}
                    required
                  />
                  <Input
                    type="text"
                    name="model"
                    placeholder={translations.model}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.model}
                    required
                  />
                  <Input
                    type="text"
                    name="plateNumber"
                    placeholder={translations.plateNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.plateNumber}
                    required
                  />
                  <Input
                    type="text"
                    name="insuranceDate"
                    placeholder={translations.insuranceDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.insuranceDate}
                    required
                  />
                  <Input
                    type="text"
                    name="inspectionDate"
                    placeholder={translations.inspectionDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.inspectionDate}
                    required
                  />
                  <Query query={ALL_DEVICES}>
                    {({ loading, error, data }) => {
                      if (loading) return 'Loading...';
                      if (error) return `Error! ${error.message}`;

                      return (
                        <Select
                          name="deviceId"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.deviceId}
                          required
                        >
                          <option value="" defaultValue disabled hidden>
                            {translations.device_id}
                          </option>
                          {data.allDevices.map(device => (
                            <option key={device.name} value={device.name}>
                              {device.name}
                            </option>
                          ))}
                        </Select>
                      );
                    }}
                  </Query>
                  <StyledButton type="submit" disabled={isSubmitting}>
                    Dodaj
                  </StyledButton>
                </Form>
              )}
            </Formik>
          </FormWrap>
        )}
      </Mutation>
    );
  }
}

export default withRouter(NewVehicleForm);
