import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const GridWrap = styled.div`
  display: grid;
  grid-template-columns: ${({viewStyle}) => (viewStyle ? 'repeat(auto-fill, minmax(22.5rem, 1fr))' : '1fr')};
  grid-gap: 35px 42px;
  padding-top: 0.8vh;
  padding-bottom: 32vh;
  transition: 0.3s ease;
`;

const GridListTemplate = ({children, viewStyle}) => (
    <>
        <GridWrap viewStyle={viewStyle}>
            {children}
        </GridWrap>
    </>
);

GridListTemplate.propTypes = {
    children: PropTypes.element.isRequired,
    viewStyle: PropTypes.bool.isRequired
}

export default GridListTemplate;
