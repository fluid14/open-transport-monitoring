import React from 'react';
import PropTypes from 'prop-types';
import TopBar from 'components/organisms/TopBar/TopBar';
import Map from 'components/organisms/Map/Map';
import ContentWrap from 'components/atoms/ContentWrap';

const AllVehiclesTemplate = ({ children }) => (
  <>
    <TopBar userName="Jan Nowak" />
    <ContentWrap>{children}</ContentWrap>
    <Map />
  </>
);

AllVehiclesTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AllVehiclesTemplate;
