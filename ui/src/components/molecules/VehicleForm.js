import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ADD_VEHICLE from 'graphql/mutations/addVehicle';
import { Formik } from 'formik';
import { Query } from 'react-apollo';
import ALL_DEVICES from 'graphql/queries/allDevices';
import UPDATE_VEHICLE from 'graphql/mutations/updateVehicle';
import translations from 'translations/pl/newVehicleBar.json';
import translationsBtn from 'translations/pl/buttons.json';
import Mutation from 'react-apollo/Mutation';
import styled from 'styled-components';
import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import { withRouter } from 'react-router-dom';
import DatePicker from 'components/atoms/DatePicker';

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
  margin-top: 1.5rem;
`;

class VehicleForm extends Component {
  state = {
    initialState: {
      vehicleId: this.props.match.params.id,
      brand: this.props.data ? this.props.data.brand : '',
      model: this.props.data ? this.props.data.model : '',
      deviceId: this.props.data ? this.props.data.deviceId : '',
      plateNumber: this.props.data ? this.props.data.numberPlate : '',
      insuranceDate: this.props.data ? this.props.data.insuranceDate : '',
      inspectionDate: this.props.data ? this.props.data.inspectionDate : '',
    },
  };
  handleFormSubmit = (values, setSubmitting, submitForm, data, toggleNewVehicleBar, resetForm) => {
    const {
      vehicleId,
      deviceId,
      plateNumber,
      brand,
      model,
      insuranceDate,
      inspectionDate,
    } = values;
    const { type } = this.props;

    if (type === 'add') {
      submitForm({
        variables: {
          deviceId: deviceId,
          plateNumber: plateNumber,
          brand: brand,
          model: model,
          insuranceDate: insuranceDate,
          inspectionDate: inspectionDate,
        },
      });
    } else {
      submitForm({
        variables: {
          vehicleId: vehicleId,
          deviceId: deviceId,
          plateNumber: plateNumber,
          brand: brand,
          model: model,
          insuranceDate: insuranceDate,
          inspectionDate: inspectionDate,
        },
      });
    }
    setSubmitting(false);
    toggleNewVehicleBar();
    resetForm();
    return data;
  };

  handleOnComplete = data => {
    const { type, history } = this.props;
    if (type === 'add') {
      const {
        addVehicle: { vehicleId },
      } = data;
      history.push(`/vehicle/${vehicleId}`);
    } else if (type === 'update') {
      const {
        updateVehicle: { vehicleId },
      } = data;
      history.go(`/vehicle/${vehicleId}`);
    }
  };

  render() {
    const { toggleNewVehicleBar, type } = this.props;
    const {
      initialState,
      initialState: { inspectionDate, insuranceDate },
    } = this.state;
    return (
      <Mutation
        mutation={type === 'add' ? ADD_VEHICLE : UPDATE_VEHICLE}
        onCompleted={data => this.handleOnComplete(data)}
      >
        {(submitForm, { data }) => (
          <FormWrap>
            <Formik
              initialValues={initialState}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                this.handleFormSubmit(
                  values,
                  setSubmitting,
                  submitForm,
                  data,
                  toggleNewVehicleBar,
                  resetForm,
                );
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue,
              }) => (
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
                  <DatePicker
                    onChange={setFieldValue}
                    name="insuranceDate"
                    onBlur={handleBlur}
                    value={inspectionDate}
                    placeholder={translations.insuranceDate}
                  />
                  <DatePicker
                    onChange={setFieldValue}
                    name="inspectionDate"
                    onBlur={handleBlur}
                    value={insuranceDate}
                    placeholder={translations.inspectionDate}
                  />
                  <Query query={ALL_DEVICES}>
                    {({ loading, error, data }) => {
                      if (loading) return 'Loading...';
                      if (error) return `Error! ${error.message}`;

                      return (
                        <Input
                          name="deviceId"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.deviceId}
                          placeholder={translations.device_id}
                          select
                          required
                        >
                          <option value="" defaultValue disabled hidden></option>
                          {data.allDevices.map(device => (
                            <option key={device.name} value={device.name}>
                              {device.name}
                            </option>
                          ))}
                        </Input>
                      );
                    }}
                  </Query>
                  <StyledButton type="submit" disabled={isSubmitting}>
                    {type === 'add' && <>{translationsBtn.add}</>}
                    {type === 'update' && <>{translationsBtn.save}</>}
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

VehicleForm.propTypes = {
  toggleNewVehicleBar: PropTypes.func.isRequired,
  data: PropTypes.object,
};

export default withRouter(VehicleForm);
